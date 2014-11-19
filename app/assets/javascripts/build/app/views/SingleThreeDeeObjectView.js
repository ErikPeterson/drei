var THREE = require('three');
    THREE.ImageUtils.crossOrigin = 'anonymous';

var RenderMachine = require('render-machine-3js');

module.exports = function(Backbone, Drei){
    var $ = Backbone.$;
    var $body = $('body');
    var SingleThreeDeeObjectView = Backbone.View.extend({
        tagName: "div",
        className: "three-scene",
        events: {
            'click a':'handleLink',
            'dblclick .three-single-canvas': 'clickZoom'
        },
        initialize: function(){
            this.$parent = (this.parent_el ? $(this.parent_el) : $body);
            this.listenToOnce(this.model, 'sync', this.initRender);
        },
        initRender: function(){
            this.$parent.html(this.$el);
            this.width = this.$el.width();
            this.height = this.$el.height();
            return this.createRenderer();
        },
        createRenderer: function(){
            this.rm = new RenderMachine();
            THREE.Loader.prototype.crossOrigin = "";
            var loader = new THREE.JSONLoader();
            loader.load(this.model.get('json_path'), this.provision.bind(this), this.model.get('asset_path') );
    
            return this;
        },
        provision: function(geometry, materials){
            this.rm.scene = new THREE.Scene();

            this.rm.camera = new THREE.PerspectiveCamera( 50, this.width/this.height, 0.1, 100 );
            this.rm.camera.position.z = 15;

            this.amb_light = new THREE.AmbientLight(0xffffff, 0.1);
            this.d_light = new THREE.DirectionalLight( 0xffffff, 0.6);
            this.d_light.shadowCameraVisible = true;
            this.d_light.position.set(0, 5, 1);
            this.d_light.castShadow = true;
            this.d_light.shadowDarkness = 1;

            this.rm.scene.add(this.amb_light);
            this.rm.scene.add(this.d_light);

            this.three_model = this.normalize_mesh(geometry, materials); 
            this.bounding_box_helper = new THREE.BoundingBoxHelper(this.three_model, 0xff0000);
            this.rm.scene.add(this.three_model);
            this.rm.renderer = new THREE.WebGLRenderer({antialias: true});
            this.rm.renderer.shadowMapEnabled = true;
            this.rm.renderer.setSize(this.width, this.height);
            this.render();

        },
        normalize_mesh: function(geometry, materials){
            var mat = new THREE.MeshFaceMaterial(materials);
            var mesh = new THREE.Mesh(geometry, mat);
                mesh.receiveShadow = true;
                mesh.castShadow = true;
            var xmin = Infinity;
            var xmax = -Infinity;
            var ymin = Infinity;
            var ymax = -Infinity;
            var zmin = Infinity;
            var zmax = -Infinity;

            for (var i = 0; i < geometry.vertices.length; i++) {
                var v = geometry.vertices[i];
                if (v.x < xmin)
                    xmin = v.x;
                else if (v.x > xmax)
                    xmax = v.x;
                if (v.y < ymin)
                    ymin = v.y;
                else if (v.y > ymax)
                    ymax = v.y;
                if (v.z < zmin)
                    zmin = v.z;
                else if (v.z > zmax)
                    zmax = v.z;
            }

            var centerX = (xmin+xmax)/2;
            var centerY = (ymin+ymax)/2; 
            var centerZ = (zmin+zmax)/2;
            var max = Math.max(centerX - xmin, xmax - centerX);
                max = Math.max(max, Math.max(centerY - ymin, ymax - centerY) );
                max = Math.max(max, Math.max(centerZ - zmin, zmax - centerZ) );
            var scale = 1;

            mesh.position.set( -centerX, -centerY, -centerZ );

            var model = new THREE.Object3D();

            model.add(mesh);
            model.scale.set(scale,scale,scale)
            return model;
        },
        render: function(){
            this.$el.html(this.rm.renderer.domElement);
            this.rm.renderer.domElement.setAttribute('class', 'three-single-canvas');
            this.rm.render();
            this.has_rendered = true;
            this.bindKeys();
        },
        bindKeys: function(e){
            $(document).on('keydown', this.startKey.bind(this));
            $(document).on('keyup', this.endKey.bind(this));
        },
        handleLink: function(e){
            return Drei.handleLink(e);
        },
        startKey: function(e){
            var key = e.which;
            var panKeys = [65, 68, 83, 87];

            if(key >= 37 && key <= 40){
                e.preventDefault();
                this.startTurn(key);
            } else if( panKeys.indexOf(key) !== -1 ){
                this.startPan(key);
            }
        },
        endKey: function(e){
            var key = e.which;
            var panKeys = [65, 68, 83, 87];
            console.log(key, panKeys.indexOf(key));
            if(key >= 37 && key <= 40){
                this.endTurn(key);
            } else if( panKeys.indexOf(key) !== -1 ){
                this.endPan(key);
            }
        },
        turnLeft: function(){
            this.turning_left = true;
            this.three_model.rotation.y -= 0.05
        },
        turnRight: function(){
            this.turning_right = true;
            this.three_model.rotation.y += 0.05
        },
        turnTop: function(){
            this.turning_top = true;
            this.three_model.rotation.x -= 0.05
        },
        turnBottom: function(){
            this.turning_bottom = true;
            this.three_model.rotation.x += 0.05
        },
        startTurn: function(dircode){

            var turnFunction = false;

            switch(dircode){
                case 37:
                    turnFunction = (this.turning_left) ? false : this.turnLeft.bind(this);
                    break;
                case 38:
                    turnFunction = (this.turning_top) ? false : this.turnTop.bind(this);
                    break;
                case 39:
                    turnFunction = (this.turning_right) ? false : this.turnRight.bind(this);
                    break;
                case 40:
                    turnFunction = (this.turning_bottom) ? false : this.turnBottom.bind(this);
                    break;
            }
            
            if(turnFunction) this.rm.on('beforeRender', turnFunction);
        },
        endTurn: function(dircode){

            var turnFunction;

            switch(dircode){
                case 37:
                    turnFunction = this.turnLeft.bind(this);
                    this.turning_left = false;
                    break;
                case 38:
                    turnFunction = this.turnTop.bind(this);
                    this.turning_top = false;
                    break;
                case 39:
                    turnFunction = this.turnRight.bind(this);
                    this.turning_right = false;
                    break;
                case 40:
                    turnFunction = this.turnBottom.bind(this);
                    this.turning_bottom = false;
                    break;
            }

            this.rm.off('beforeRender', turnFunction)
        },
        startPan: function(dircode){
            var panFunction = false;

            switch(dircode){
                case 65:
                    panFunction = (this.panning_left) ? false : this.panLeft.bind(this);
                break;
                case 68:
                    panFunction = (this.panning_right) ? false : this.panRight.bind(this);
                break;
                case 83:
                    panFunction = (this.panning_down) ? false : this.panDown.bind(this);
                break;
                case 87:
                    panFunction = (this.panning_up) ? false : this.panUp.bind(this);
                break;
            }
            
            if(panFunction) this.rm.on('beforeRender', panFunction);
        },
        endPan: function(dircode){

            var panFunction;

            switch(dircode){
                case 65:
                    panFunction = this.panLeft.bind(this);
                    this.panning_left = false;
                    break;
                case 68:
                    panFunction = this.panRight.bind(this);
                    this.panning_right = false;
                    break;
                case 83:
                    panFunction = this.panDown.bind(this);
                    this.panning_down = false;
                    break;
                case 87:
                    panFunction = this.panUp.bind(this);
                    this.panning_up = false;
                    break;
            }

            this.rm.off('beforeRender', panFunction)
        },
        panLeft: function(){
            this.panning_left = true;
            this.rm.camera.position.x += 0.1;
        },
        panRight: function(){
            this.panning_right = true;
            this.rm.camera.position.x -= 0.1;
        },
        panDown: function(){
            this.panning_down = true;
            this.rm.camera.position.y -= 0.1;
        },
        panUp: function(){
            this.panning_up = true;
            this.rm.camera.position.y += 0.1;
        },
        clickZoom : function(e){
            e.preventDefault();
            if(!this.has_rendered) return;
            var factor = e.altKey ? 2 : 0.5;

            this.zoomCamera(factor);
        },
        zoomCamera: function(factor){
            this.rm.camera.fov *= factor;
            this.rm.camera.updateProjectionMatrix();
        }
    });
    return SingleThreeDeeObjectView;
};
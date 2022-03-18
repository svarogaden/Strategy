const _VSFire = `
    uniform float delta;
    varying float vOpacity;

 void main() 
{
    	
    vec3 p = position; 
    float jet_lenght =2.0;
    
    gl_PointSize = 4.0 + (p.z/jet_lenght) ;
    p.z=-jet_lenght* abs(sin(p.z + delta));
    
    
    vOpacity= 1.0+(p.z/jet_lenght);
    

    vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;


}`;


const _FSFire = `
 uniform sampler2D plazma_texture;	
 varying float vOpacity;

 void main() 
{
 
gl_FragColor = vec4(1.0, 1.0, 0.0, vOpacity); 
gl_FragColor = gl_FragColor * texture2D( plazma_texture,vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );

    
}`;



function FireJet()
{ 


        let customUniforms = {
            delta: { value: 0 },
            plazma_texture: { type: "t", value: AsyncLoader.tex["Fire"] }
        };


        let materialShader = new THREE.ShaderMaterial({
            uniforms: customUniforms,
            vertexShader: _VSFire,
            fragmentShader: _FSFire,

            depthWrite: false,
            transparent: true,
            blending: THREE.AdditiveBlending

        });




       let particleCount = 100 * 2;  //цифра должна быть кратна трем
       let plazmaGeometry = new THREE.BufferGeometry();

       let vertices = new Float32Array(particleCount);
       plazmaGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));


      for (var i = 0, ivertex = 0; i < particleCount; i++, ivertex += 3)
      {

            //vertices[ivertex + 0] = THREE.Math.randFloat(-0.5, 0.5);
            //vertices[ivertex + 1] = THREE.Math.randFloat(-0.5, 0.5);
            //vertices[ivertex + 2] = ivertex;

          vertices[ivertex + 0] = THREE.Math.randFloat(-0.5, 0.5);
          vertices[ivertex + 1] = THREE.Math.randFloat(-0.5, 0.5);
          vertices[ivertex + 2] = ivertex;


         


      }



    let FireJetMesh = new THREE.Points(plazmaGeometry, materialShader);

    FireJetMesh.rotation.x = Math.PI * 0.495;
    FireJetMesh.name = "FireJet";


    return FireJetMesh;

    /*this.materialShader.uniforms.delta.value += 2;*/

}

















//class FireJet {


//    constructor() {

       
            
//        //Основная плазма
//        this.customUniforms = {
//            delta: { value: 0 },
//            plazma_texture: { type: "t", value: AsyncLoader.tex["Fire"] }
//        };


//        this.materialShader = new THREE.ShaderMaterial({
//            uniforms: this.customUniforms,
//            vertexShader: _VSFire,
//            fragmentShader: _FSFire,

//            depthWrite: false,
//            transparent: true,
//            blending: THREE.AdditiveBlending

//        });


//        let particleCount = 280 * 3;  //цифра должна быть кратна трем
//        this.plazmaGeometry = new THREE.BufferGeometry();

//        let vertices = new Float32Array(particleCount);
//        this.plazmaGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));


//        for (var i = 0, ivertex = 0; i < particleCount; i++, ivertex += 3) {

//            vertices[ivertex + 0] = THREE.Math.randFloat(-1.5, 1.5);
//            vertices[ivertex + 1] = THREE.Math.randFloat(-1.5, 1.5);
//            vertices[ivertex + 2] = ivertex

//        }

//        this.FireJetMesh = new THREE.Points(this.plazmaGeometry, this.materialShader);




//      // this.CreatePlazmaJet();



//    }





//    AnimateJet()
//    {
//        this.materialShader.uniforms.delta.value += 2;
//    }

   



//}

//



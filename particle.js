
// variables for the particle effect
var nParticles = 200;

var psTextureNode = new Array (nParticles);
var psTransformationNode = new Array(nParticles);

var lifeTime = new Array(nParticles);

var particleX = new Array(nParticles);
var particleY = new Array(nParticles);
var particleZ = new Array(nParticles);


function createParticleEffect() {

  for (let i = 0; i < nParticles; i++) {

    lifeTime[i] = Math.random()*8;

    psTextureNode[i] = new TransparentSGNode(new MaterialSGNode(new BillboardSGNode(new TextureSGNode(fireTexture, 2,
                new RenderSGNode(makeRect(.05, .05))))));

    particleX[i] = (Math.random() - 5)/10
    particleY[i] = (Math.random() + 3)/10;
    particleZ[i] = (Math.random() - 5)/10

    psTransformationNode[i] = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                  translate: [particleX[i], particleY[i], particleZ[i]]
                }),  [psTextureNode[i]])]);

    root.append(psTransformationNode[i]);

    }
}

function animateParticleEffect() {

  for (let i = 0; i < nParticles; i++) {
    if (particleY[i] < lifeTime[i]) {
      particleY[i] += 0.05;
    } else {
      particleY[i] = 0;
    }

    psTransformationNode[i].matrix = glm.transform({
      translate: [particleX[i], particleY[i], particleZ[i]]
    });
  }
}

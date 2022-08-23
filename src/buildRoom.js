
module.exports = function buildWalls(corners, roomHeight, scene) {
    var polygonCorners = [];
    
    for (let i = 0; i < corners.length; i++) {
        polygonCorners.push(new BABYLON.Vector3(corners[i].x, corners[i].y, 0));
    }
    polygonCorners.push(new BABYLON.Vector3(corners[0].x, corners[0].y, 0));
    
    for (var i = 0; i < polygonCorners.length - 1; i++) {
        BABYLON.MeshBuilder.ExtrudeShape("wall" + i, { shape: [polygonCorners[i], polygonCorners[i + 1]], 
                                                       path:  [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, roomHeight, 0)],
                                                       sideOrientation: BABYLON.Mesh.BACKSIDE },
                                          scene
                                        );
    }
}

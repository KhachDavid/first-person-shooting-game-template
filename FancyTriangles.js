function FancyTriangle(canvas, context) {
    this.triangles = [];
    this.canvas = canvas;
    this.context = context || canvas.getContext('2d');
}

FancyTriangle.prototype.clear = function () {
    this.triangles = [];
};

FancyTriangle.prototype.triangle = function (vertex1, vertex2, vertex3, fill, stroke) {
    this.triangles.push(
        {
            "v1": vertex1,
            "v2": vertex2,
            "v3": vertex3,
            "fill": fill || "blue",
            "stroke": stroke,
            "zmax": Math.max(vertex1[2], vertex2[2], vertex3[2]),
            "zsum": vertex1[2] + vertex2[2] + vertex3[2]
        }
    )
};

FancyTriangle.prototype.render = function () {
    var thisHolder = this;

    this.triangles.sort(function (a, b) {
        if (a.zsum > b.zsum) {
            return -1;
        } else {
            return 1;
        }
    });

    this.triangles.forEach(function (tri) {
        thisHolder.context.beginPath();
        thisHolder.context.fillStyle = tri.fill;
        thisHolder.context.strokeStyle = tri.stroke || "black";
        thisHolder.context.moveTo(tri.v1[0], tri.v1[1]);
        thisHolder.context.lineTo(tri.v2[0], tri.v2[1]);
        thisHolder.context.lineTo(tri.v3[0], tri.v3[1]);
        thisHolder.context.closePath();
        thisHolder.context.fill();
        if (tri.stroke) {
            thisHolder.context.stroke()
        }
    });
};

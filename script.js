function setup() {

    function drawBuilding(num, viewProj, model, redValue, greenValue, blueValue, emphasis) {
        var buildingVertices;
        if (num == 1) {
            buildingVertices = buildingVertices1;
            redValue = redValue || 165;
            blueValue = blueValue || 30;
            greenValue = greenValue || 30;
        }
        else {
            buildingVertices = buildingVertices2;
            redValue = redValue || 72;
            blueValue = blueValue || 209;
            greenValue = greenValue || 204;
        }

        emphasis = emphasis || 10;
        model = model || m4.identity();
        var dir = v3.normalize([1, 3, 2]);
        for (var i = 0; i < buildingTriangles.length; i++) {

            var t = buildingTriangles[i];
            var p1 = m4.transformPoint(model, buildingVertices[t[0]]);
            var p2 = m4.transformPoint(model, buildingVertices[t[1]]);
            var p3 = m4.transformPoint(model, buildingVertices[t[2]]);

            // compute the normal
            var e1 = v3.subtract(p1, p2);
            var e2 = v3.subtract(p1, p3);
            var n = v3.normalize(v3.cross(e1, e2));

            var p1 = m4.transformPoint(viewProj, p1);
            var p2 = m4.transformPoint(viewProj, p2);
            var p3 = m4.transformPoint(viewProj, p3);

            var r, g, b;

            r = redValue + (i % 2) * emphasis;
            g = greenValue + (i % 2) * emphasis;
            b = blueValue;

            var l = .5 + Math.abs(v3.dot(n, dir));
            r = r * l;
            g = g * l;
            b = b * l;

            var color = "rgb(" + Math.round(r - 10) + "," + Math.round(g + 24) + "," + Math.round(b + 90) + ")";

            fancyTriangle.triangle(p1, p2, p3, color);
        };

    }

    function drawRoof(viewProj, model, redValue, greenValue, blueValue, emphasis) {
        redValue = redValue || 9;
        blueValue = blueValue || 42;
        greenValue = greenValue || 42;
        emphasis = emphasis || 10;
        model = model || m4.identity();
        var dir = v3.normalize([1, 3, 2]);
        for (var i = 0; i < roofTriangles.length; i++) {

            var t = roofTriangles[i];
            var p1 = m4.transformPoint(model, roofVertices[t[0]]);
            var p2 = m4.transformPoint(model, roofVertices[t[1]]);
            var p3 = m4.transformPoint(model, roofVertices[t[2]]);

            // normalize the vectors
            var e1 = v3.subtract(p1, p2);
            var e2 = v3.subtract(p1, p3);
            var n = v3.normalize(v3.cross(e1, e2));

            var p1 = m4.transformPoint(viewProj, p1);
            var p2 = m4.transformPoint(viewProj, p2);
            var p3 = m4.transformPoint(viewProj, p3);

            // create the colors
            var r, g, b;

            r = redValue + (i % 2) * emphasis;
            g = greenValue + (i % 2) * emphasis;
            b = blueValue;

            var l = .5 + Math.abs(v3.dot(n, dir));
            r = r * l;
            g = g * l;
            b = b * l;

            var color = "rgb(" + Math.round(r - 10) + "," + Math.round(g + 24) + "," + Math.round(b + 90) + ")";

            fancyTriangle.triangle(p1, p2, p3, color);
        };
    }

    function draw() {
        myCanvas.width = myCanvas.width; //clear canvas

        var viewport = m4.scaling([xsize / 2, -ysize / 2, 1]); // set viewport
        m4.setTranslation(viewport, [xsize / 2, ysize / 2, 0], viewport);

        var fov = toRadians(mySliders.walk.value);
        var projection = m4.perspective(fov, 1, 0.1, 100);

        var lookAtPoint = [mySliders.turn.value, 4, -30]; 
        var lookFromPoint = [mySliders.cross.value, 4, 15]; 
        var lookatInverse = m4.lookAt(lookFromPoint, lookAtPoint, [0, 1, 0]);
        var lookatMatrix = m4.inverse(lookatInverse);

        var viewi = m4.multiply(lookatMatrix, projection);
        var view = m4.multiply(viewi, viewport);

        fancyTriangle.clear();

        // road
        var x, z;
        for (x = -2; x < 2; x += 2) {
            for (z = -700; z < 10; z += 2) {
                var corner1 = m4.transformPoint(view, [x, 0, z]);
                var corner2 = m4.transformPoint(view, [x, 0, z + 2]);
                var corner3 = m4.transformPoint(view, [x + 2, 0, z + 2]);
                var corner4 = m4.transformPoint(view, [x + 2, 0, z]);
                fancyTriangle.triangle(corner1, corner2, corner3, ((x + z) % 2) ? roadColorDark : roadColorLight);
                fancyTriangle.triangle(corner1, corner3, corner4, ((x + z) % 2) ? roadColorDark : roadColorLight2);
            }
        }

        // houses
        drawBuilding(1, view, m4.translation([5, 0, -10]));
        drawBuilding(1, view, m4.translation([-10, 0, -10]));
        drawBuilding(2, view, m4.translation([5, 0, -25]));
        drawBuilding(2, view, m4.translation([-10, 0, -25]));
        drawRoof(view, m4.translation([5, 5, -25]));
        drawRoof(view, m4.translation([-10, 5, -25]));
        
        for (let i = 0; i < 100; i++) {
            drawBuilding(1, view, m4.translation([5, 0, -50 - 50 * i]));
            drawBuilding(1, view, m4.translation([-10, 0, -50 - 50 * i]));
            drawBuilding(2, view, m4.translation([5, 0, -75 - 50 * i]));
            drawBuilding(2, view, m4.translation([-10, 0, -75 - 50 * i]));
            drawRoof(view, m4.translation([5, 5, -75- 50 * i]));
            drawRoof(view, m4.translation([-10, 5, -75 - 50 * i]));
        }

        // frontyard
        for (x = -52; x < -2; x += 5) {
            for (z = -700; z < 10; z += 5) {
                var corner1 = m4.transformPoint(view, [x, 0, z]);
                var corner2 = m4.transformPoint(view, [x, 0, z + 5]);
                var corner3 = m4.transformPoint(view, [x + 5, 0, z + 5]);
                var corner4 = m4.transformPoint(view, [x + 5, 0, z]);
                fancyTriangle.triangle(corner1, corner2, corner3, ((x + z) % 2) ? "#000" : "#3F1");
                fancyTriangle.triangle(corner1, corner3, corner4, ((x + z) % 2) ? "#000" : "#5F0");
            }
        }

        for (x = 2; x < 52; x += 5) {
            for (z = -700; z < 10; z += 5) {
                var corner1 = m4.transformPoint(view, [x, 0, z]);
                var corner2 = m4.transformPoint(view, [x, 0, z + 5]);
                var corner3 = m4.transformPoint(view, [x + 5, 0, z + 5]);
                var corner4 = m4.transformPoint(view, [x + 5, 0, z]);
                fancyTriangle.triangle(corner1, corner2, corner3, ((x + z) % 2) ? "#000" : "#3F1");
                fancyTriangle.triangle(corner1, corner3, corner4, ((x + z) % 2) ? "#000" : "#5F0");
            }
        }

        // front yard fence
        for (x = -54; x < -2; x += 5) {
            for (z = -700; z < 10; z += 5) {
                var corner1 = m4.transformPoint(view, [x+1, 2, z]);
                var corner2 = m4.transformPoint(view, [x+1, 2, z + 5]);
                var corner3 = m4.transformPoint(view, [x+1, 2, z + 5]);
                var corner4 = m4.transformPoint(view, [x+1, 2, z]);
                fancyTriangle.triangle(corner1, corner2, corner3, "#000");
                fancyTriangle.triangle(corner1, corner3, corner4, "#000");
            }
        }


        fancyTriangle.render();

        window.requestAnimationFrame(draw);
    }

    sliders.forEach(function (s) {
        var sl = document.getElementById(s[0]);
        sl.value = s[3];
        mySliders[s[0]] = sl;
    });

    window.requestAnimationFrame(draw)
}
window.onload = setup;
  window.loggedIn = false
    //Math things
    function randomIntInRange(a, b) {
      return ((Math.random() * (b - a + 1)) | 0) + a;
    }
    function map_line(x, x1, x2, y1, y2) {
      let m = (y2 - y1) / (x2 - x1);
      let y0 = y1 - m * x1;
      return m * x + y0;
    }

    //Objects
    function Char() {
      this.frequency = (function() {
        if (Math.random() > 0.2) {
          return 0;
        } else {
          return randomIntInRange(5, 10);
        }
      })();
      this.change = function() {
        this.value = String.fromCharCode(randomIntInRange(0x30a0, 0x30ff));
      };
      this.change();
    }
    function Column(location) {
      this.size = randomIntInRange(8, 30);
      this.position = randomIntInRange(-20, 1);
      this.location = location;
      this.speed = randomIntInRange(2, 4);
      this.chars = [];
      this.colors = [];
      for (let y = 0; y < this.size; y++) {
        this.chars[y] = new Char();

        this.colors[y] = window.loggedIn ?
          "rgba(0, 200, 70 , " + map_line(y, this.size, 0, 0, 1.1) + ")" :
        "rgba(255, 0, 70 , " + map_line(y, this.size, 0, 0, 1.1) + ")"
        ;
      }
      this.show = function(canvas) {
        canvas.fillStyle = "rgba(240, 255, 240, 1)";
        canvas.shadowColor = "rgba(255, 255, 255, 1)";
        canvas.shadowBlur = scale * 0.7;
        canvas.fillText(
          this.chars[0].value,
          this.location * scale,
          this.position * scale
        );
        for (let y = 1; y < this.size; y++) {
          canvas.fillStyle = this.colors[y];
          canvas.shadowColor = this.colors[y];
          canvas.shadowBlur = scale * 0.1;
          canvas.fillText(
            this.chars[y].value,
            this.location * scale,
            (this.position - y) * scale
          );
        }
      };
      this.run = function() {
        this.chars.unshift(new Char());
        this.chars.pop();
        this.position++;
      };
      this.change = function(frame) {
        this.chars.forEach(char => {
          if (frame % char.frequency == 0) {
            char.change();
          }
        });
      };
    }
    function Grid(fade, fontSize) {
      this.width = Math.floor(window.innerWidth / scale);
      this.height = Math.floor(window.innerHeight / scale);
      this.columns = [];
      this.fontSize = fontSize;
      this.fade = fade;
      for (let x = 0; x < this.width; x++) {
        this.columns[x] = new Column(x, this.height);
      }
      this.run = function(frame) {
        this.columns.forEach(column => {
          if (frame % column.speed == 0) {
            column.run();
          }
          column.change(frame);
        });
      };
      this.show = function(canvas) {
        draw_canvas.font = this.fontSize + "px Monospace";
        canvas.fillStyle = "rgba(0,0,0," + this.fade + ")";
        canvas.fillRect(0, 0, canvas_element.width, canvas_element.height);
        this.columns.forEach((column, index) => {
          if (column.position - column.size > this.height) {
            column.chars.forEach(char => {
              clearInterval(char.change);
            });
            this.columns[index] = new Column(index);
          } else {
            column.show(canvas);
          }
        });
      };
    }

    //Camvas
    var canvas_element = document.getElementById("main_canvas");
    canvas_element.width = window.innerWidth;
    canvas_element.height = window.innerHeight;
    var draw_canvas = canvas_element.getContext("2d");

    var scale = 20;
    draw_canvas.font = scale + "px Monospace";

    var grid = new Grid(0.5, scale);
    var grid2 = new Grid(1, scale);
    var countframes = 0;
    var draw = setInterval(function() {
      grid2.run(countframes);
      grid2.show(draw_canvas);
      grid.run(countframes);
      grid.show(draw_canvas);
      countframes++;
    }, 30);
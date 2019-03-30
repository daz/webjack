var mic, fft,
  labelScale = 3, 
  userInteracted = false; // need to wait for user interaction before using WebAudio https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

function setupEqualizer() {

  var myp5 = new p5( function(sketch) {

    var x = 100; 
    var y = 100;

    sketch.setup = function() {
      sketch.createCanvas(350, 100);
      sketch.noFill();

      userInteracted = true;

      mic = new p5.AudioIn();
      mic.start();
      fft = new p5.FFT();
      fft.setInput(mic);
    };

    sketch.draw = function() {
      if (userInteracted) {
        var scale = 1;
        sketch.background(200);

        sketch.text(parseInt(map(sketch.mouseX, 0, sketch.width, 20, 15000 / scale)) + " Hz", sketch.mouseX - 10, sketch.mouseY - 20);
        var spectrum = fft.analyze();

        sketch.beginShape();
        sketch.vertex(0, sketch.height * 0.9);
        for (i = 0; i < spectrum.length / scale; i++) {
          sketch.vertex(i * scale, map(spectrum[i], 0, 255, sketch.height * 0.8, 0));
        }
        sketch.vertex(sketch.width, sketch.height * 0.9);
        sketch.endShape();

        var freq
        // draw labels
        for (i = 0; i < spectrum.length / scale; i += sketch.width / labelScale) {
          freq = parseInt(map(i, 0, 1024, 20, 15000));
          sketch.text(freq, map(i, 0, 1024 / scale, 0, sketch.width), sketch.height * 0.97);
          sketch.fill(0, 100);
        }
      }
    }
  }, $('.equalizer')[0]);
}

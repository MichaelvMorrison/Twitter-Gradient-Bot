// Constants
color c1, c2;

void setup() {
  size(600, 600);

  // Define colors
  c1 = color(random(0,255), random(0,255), random(0,255));
  c2 = color(random(0,255), random(0,255), random(0,255));
  setGradient(0, 0, width, height, c1, c2);
  save("gradient.png");
  exit();
}

void setGradient(int x, int y, float w, float h, color c1, color c2) {

  noFill(); 
    for (int i = x; i <= x+w; i++) {
      float inter = map(i, x, x+w, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
}

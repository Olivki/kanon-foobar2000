var Buttons;

var g_tooltip = window.CreateTooltip();
var btn = null;

var StringAlignment = {
	Near: 0,
	Center: 1,
	Far: 2
};

function Button(x, y, w, h, img_src, func, tiptext) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.func = func;
	this.tiptext = tiptext;
	this.img_normal = img_src && img_src.normal ? gdi.Image(img_src.normal) : null;
	this.img_hover = img_src && img_src.hover ? gdi.Image(img_src.hover) : this.img_normal;
	this.img = this.img_normal;

	this.trace = function(x, y) {
		return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
	}

	this.draw = function (gr) {
		/*var font = gdi.Font("Segoe UI", 15, 1);
		var absoluteCenter = StringFormat(StringAlignment.Center, StringAlignment.Center);
		gr.SetSmoothingMode(4);
		gr.SetTextRenderingHint(4);
		gr.DrawString("FM", font, 0xFFFFFFFF, x, y, w, h, absoluteCenter);*/
		this.img && gr.DrawImage(this.img, this.x, this.y, this.w, this.h, 0, 0, this.img.Width, this.img.Height);
	}

	this.click = function () {
		this.func && this.func(x, y);
		window.Repaint();
	}

	this.update = function(u) {
		switch(u) {
			case 0:
				this.img = this.img_normal;
				g_tooltip.Text = '';
				g_tooltip.Deactivate();
				break;
			case 1:
				this.img = this.img_hover;
				g_tooltip.Text = this.tiptext;
				g_tooltip.Activate();
				break;
		}
		window.RepaintRect(this.x, this.y, this.w, this.h);
		window.Repaint();
	}
}

function StringFormat() {
	var h_align = 0,
		v_align = 0,
		trimming = 0,
		flags = 0;

	switch (arguments.length) {
		case 4:
			flags = arguments[3];
		case 3:
			trimming = arguments[2];
		case 2:
			v_align = arguments[1];
		case 1:
			h_align = arguments[0];
			break;
		default:
			return 0;
	}

	return ((h_align << 28) | (v_align << 24) | (trimming << 20) | flags);
}

function buttonsDraw(gr) {
	for (i in Buttons) {
		Buttons[i].draw(gr);
	}
}

function on_mouse_move(x, y) {
	tmp_btn = null;
	for (i in Buttons) {
		if(Buttons[i].trace(x, y)) tmp_btn = i;
	}
	if(btn == tmp_btn) return;
	if(tmp_btn) Buttons[tmp_btn].update(1);
	if(btn) Buttons[btn].update(0);
	btn = tmp_btn;
	window.Repaint();
}

function on_mouse_lbtn_up(x, y) {
	if(btn) Buttons[btn].click(x, y);
	window.Repaint();
}

function on_mouse_leave() {
	if(btn) Buttons[btn].update(0);
	btn = null;
	window.Repaint();
}
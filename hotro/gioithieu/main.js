
// ScrollMagic: init controller
var controller = new ScrollMagic.Controller();

// Tween - Section 2
var scene = new ScrollMagic.Scene({
	triggerElement: "#section2",
	duration: 1000
})

.setTween("#main-bg img", {
	maxWidth: "1200px",
	top: "30%",
	left: "80%",
	opacity: 0.25
}) 
.addTo(controller);
// Tween - Section 3
var scene = new ScrollMagic.Scene({
	triggerElement: "#section3",
	duration: 300
})
.setTween("#main-bg img", {
	top: "20%"
})
.addTo(controller);
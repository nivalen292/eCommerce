import "jquery";
import "navigo";
import { post as postRequest } from "requester";
import { get as getRequest } from "requester";
import { loadTemplate } from "loadTemplate";
import { showLoginPopUp } from 'loginRegisterPopUp';
import { showRegisterPopUp } from 'loginRegisterPopUp';
import { showCartProductsPopUp } from 'showCartProductsPopUp';
import { hideCartPopUp } from 'showCartProductsPopUp';
import { hidePopUp } from 'loginRegisterPopUp';
import { login } from "loginRegisterRequest";
import { register } from "loginRegisterRequest";
import { logout } from "loginRegisterRequest";
import { checkForLogged } from "loginRegisterRequest";
import { checkForAdmin } from 'checkForAdmin';


//Check if user is logged in
checkForLogged();
//Check if admin is logged in
checkForAdmin();

$("#login-button").on("click", showLoginPopUp);
$("#register-button").on("click", showRegisterPopUp);
$("#disabled-background").on("click", hidePopUp);
$("#cart-button").on("click",showCartProductsPopUp);
$("#disabled-background").on("click", hideCartPopUp);
$("#submit-button").on("click", (ev) => {
    var $target = $(ev.target);
    if ($target.text() === "Login") {
        login();
        //Check for admin user logged in: REWORK WITH PROMISE
        setTimeout(checkForAdmin, 50);
    }
    else if ($target.text() === "Register") {
        register();
    }
});
$("#logout-button").on("click", logout);

var router = new Navigo(null, true);
router.on("/home", () => {
    loadTemplate("home", "/api/products/latest", "main");
});
router.on("/products", () => {
    loadTemplate("product", "/api/products", "main");
});
router.on("/contact", () => {
    loadTemplate("contact", "", "main");
});
// TODO: api/product data
router.on("/addProduct", () => {
    loadTemplate("product-form", "", "main");
});

//rework might be needed
$(window).on("hashchange", () => {
    if (window.location.href === "http://localhost:3000/" || window.location.hash === "/") {
        router.navigate("/home");
        loadTemplate("home", "/api/products/latest", "main");
    }
});
//rework might be needed
$(window).on("load", () => {
    if (window.location.href === "http://localhost:3000/" || window.location.hash === "" || window.location.hash === "/") {
        router.navigate("/home");
        loadTemplate("home", "/api/products/latest", "main");
    }
});

//code for product form image
$(document).ready( function() {
    	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
		});

		$('.btn-file :file').on('fileselect', function(event, label) {
		    
		    var input = $(this).parents('.input-group').find(':text'),
		        log = label;
		    
		    if( input.length ) {
		        input.val(log);
		    } else {
		        if( log ) alert(log);
		    }
	    
		});
		function readURL(input) {
		    if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        
		        reader.onload = function (e) {
		            $('#img-upload').attr('src', e.target.result);
		        }
		        
		        reader.readAsDataURL(input.files[0]);
		    }
		}

		$("#img-input").change(function(){
		    readURL(this);
		}); 	
	});

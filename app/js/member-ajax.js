/**
 * Created by Alex on 19.05.2016.
 */

// PASSWORD RESET
$(document).ready(function() {

    var error_msg = $('#generic-popup #popup-error-message');
    var login_modal = UIkit.modal(".login-main #generic-popup");
    var reset_finish_popup = UIkit.modal("#member-login #pass-reset-finish-popup");

    login_modal.on({
        'hide.uk.modal': function () {
            error_msg.html('');
            error_msg.hide();
        }
    });

    $('#pass-reset-form').on("submit", function(e){
        e.preventDefault();
        error_msg.hide();
        error_msg.html('');

        var request = $.ajax({
            url: "/member/reset-password",
            method: "post",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $("#generic-popup .modal-btn-container button").prop("disabled", true);
            }
        });

        request.done(function(data) {
            if (data.error) {
                error_msg.html(data.error);
                error_msg.show(300);
                $("#generic-popup .modal-btn-container button").prop("disabled", false);
            } else {
                login_modal.hide();
                reset_finish_popup.show();
                $("#generic-popup .modal-btn-container button").prop("disabled", false);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    });
});

// REGISTRATION
$(document).ready(function() {

    var error_msg = $('#registration-modal #popup-error-message');
    var reg_modal = UIkit.modal("#registration-modal");
    error_msg.html('xxx').css("opacity", "0");

    reg_modal.on({
        'hide.uk.modal': function () {
            error_msg.html('xxx').css("opacity", "0");
            //error_msg.hide();
        }
    });

    $('#registration-ajax-form').on("submit", function(e){
        e.preventDefault();

        //error_msg.hide();
        error_msg.html('xxx').css("opacity", "0");

        var fields = $(".field-validation-error");
        fields.each(function(){
            $(this).removeClass("field-validation-error");
        });

        var formData = new FormData($(this)[0]);
        
        var request = $.ajax({
            url: "/member/registration-ajax",
            method: "post",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $("#registration-modal .user-registration-btn button").prop("disabled",true);
            }
        });
        request.done(function(data) {
            if (data.error) {

                if (typeof(data.error_fields) != "undefined") {
                    colorForErrorFields(data.error_fields);
                }

                error_msg.html(data.error).css("opacity", "1");
                error_msg.show(300);
                $("#registration-modal .user-registration-btn button").prop("disabled", false);

            } else {

                //alert(data.redirect);
                if(data.redirect != undefined){
                    window.parent.location.href = data.redirect;
                }else{
                    window.parent.location.href = "/member/login";
                }
            }
        });
        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    });
});

// STEP6 - SEND CRM CASE
$(document).ready(function() {

    var case_popup = UIkit.modal("#case-popup");

    /*case_popup.on({
     "hide.uk.modal": function () {
     window.location = window.location.href;
     }
     });*/

    $(".uk-thumbnail i").click(function() {

        if (!caseDone) {

            $(this).addClass("active-step6");
            $('#join-finish-case_id').val(
                $(this).parent().find($('.case-hidden')).text()
            );

            var request = $.ajax({
                url: "/member/join-finish-case",
                method: "post",
                data: $('#join-finish-form').serialize(),
                dataType: "json"
            });

            request.done(function(data) {
                if (data.error) {
                    console.log(data.error);
                } else {
                    $("#case-buttons-send").hide(500);
                    $(".uk-thumbnail i").removeClass("icon-hover");
                    caseDone = true;

                    setTimeout(function() {
                        case_popup.show();
                    }, 1000);
                }
            });

            request.fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    });
});

function changeRegType(box, form){
    if ($(box).is(':checked')) {
        form.submit();
    }
}

function uncheckRegTypeCheckBox(box) {
    if ($(box).is(':checked')) {
        box.prop('checked', false);
    }
}

function changeUserLoginType(choose_list) {

    choose_list.parent().children('.options').remove();

    var request = $.ajax({
        url: "/member/change-identity-login-type",
        method: "post",
        data: {
            choosed_entity: choose_list.val()
        },
        dataType: "json"
    });

    request.done(function(data) {
        if (data.error) {
            console.log(data.error);
        } else {
            window.parent.location.href = data.redirect;
        }
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

// CHECK REGISTRATION SESSION TIMEOUT
function sendExpiredRegistrationEmail() {

    var request = $.ajax({
        url: "/member/join-expired-registration",
        method: "get"
    });

    request.done(function(data) {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.message);
        }
    });
}

function colorForErrorFields(error_fields) {
    
    var errors = error_fields.split(";");
    errors.map(function(name) {
        var field = $("*[data-name=" + name + "]");

        if (field.prop("nodeName") == "SELECT") {
            field.parent().find(".trigger").addClass("field-validation-error");
        } else {
            field.addClass("field-validation-error");
        }
    });
}
jQuery(function () {

  "use strict";
 

  // Overview
  // -------------------------------------------------------------------------

  (function () {
    var $image = jQuery(".img-container > img"),
        $dataX = jQuery("#dataX"),
        $dataY = jQuery("#dataY"),
        $dataHeight = jQuery("#dataHeight"),
        $dataWidth = jQuery("#dataWidth"),
        options = {
          aspectRatio: 16 / 9,
          data: {
            x: 480,
            y: 60,
            width: 640,
            height: 360
          },
          preview: ".img-preview",
          done: function (data) {
            $dataX.val(Math.round(data.x));
            $dataY.val(Math.round(data.y));
            $dataHeight.val(Math.round(data.height));
            $dataWidth.val(Math.round(data.width));
          }
        };

    $image.cropper(options).on({
      "build.cropper": function (e) {
//        console.log(e.type);
      },
      "built.cropper": function (e) {
//        console.log(e.type);
      }
    });

    jQuery(document).on("click", "[data-method]", function () {
      var data = jQuery(this).data();

      if (data.method) {
        $image.cropper(data.method, data.option);
      }
    });

    var $inputImage = jQuery("#inputImage"),
        blobURL;

    if (window.URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            if (blobURL) {
              URL.revokeObjectURL(blobURL); // Revoke the old one
            }

            blobURL = URL.createObjectURL(file);
            $image.cropper("reset", true).cropper("replace", blobURL);
            $inputImage.val("");
          } else {
            showMessage("Please choose an image file.");
          }
        }
      });
    } else {
      $inputImage.parent().remove();
    }

    jQuery("#download").click(function () {
      window.open($image.cropper("getDataURL"));
    });

    var $zoomWith = jQuery("#zoomWith");

    jQuery("#zoom").click(function () {
      $image.cropper("zoom", $zoomWith.val());
    });


    var $rotateWith = jQuery("#rotateWith");

    jQuery("#rotate").click(function () {
      $image.cropper("rotate", $rotateWith.val());
    });


    var $getDataInto = jQuery("#getDataInto");

    jQuery("#getData").click(function () {
      var data = $image.cropper("getData"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $getDataInto.val(val);
    });


    var $setDataX = jQuery("#setDataX"),
        $setDataY = jQuery("#setDataY"),
        $setDataWidth = jQuery("#setDataWidth"),
        $setDataHeight = jQuery("#setDataHeight");

    jQuery("#setData").click(function () {
      var data = {
            x: $setDataX.val(),
            y: $setDataY.val(),
            width: $setDataWidth.val(),
            height: $setDataHeight.val()
          };

      $image.cropper("setData", data);
    });


    var $setAspectRatioWith = jQuery("#setAspectRatioWith");

    jQuery("#setAspectRatio").click(function () {
      $image.cropper("setAspectRatio", $setAspectRatioWith.val());
    });


    var $replaceWith = jQuery("#replaceWith");

    jQuery("#replace").click(function () {
      $image.cropper("replace", $replaceWith.val());
    });


    var $getImageDataInto = jQuery("#getImageDataInto");

    jQuery("#getImageData").click(function () {
      var data = $image.cropper("getImageData"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $getImageDataInto.val(val);
    });


    var $dataURLInto = jQuery("#dataURLInto"),
        $dataURLView = jQuery("#dataURLView");

    jQuery("#getDataURL").click(function () {
      var dataURL = $image.cropper("getDataURL");

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    jQuery("#getDataURL2").click(function () {
      var dataURL = $image.cropper("getDataURL", "image/jpeg");

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    jQuery("#getDataURL3").click(function () {
      var dataURL = $image.cropper("getDataURL", {
            width: 160,
            height: 90
          });

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    jQuery("#getDataURL4").click(function () {
      var dataURL = $image.cropper("getDataURL", {
            width: 320,
            height: 180
          }, "image/jpeg", 0.8);

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    jQuery(".docs-options :radio").on("change", function () {
      var $this = jQuery(this);

      if ($this.is(":checked")) {
        options[$this.attr("name")] = $this.val() === "true" ? true : false;
        $image.cropper("destroy").cropper(options);
      }
    });

//    jQuery("[data-toggle='tooltip']").tooltip();
  }());

 
});

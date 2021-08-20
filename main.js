let totalPages = 16;
      let isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (!isMobile) {
        $("body").css("min-width", "870px");
        $(".arrow").addClass("desktop");
        $(".test-arrow").addClass("desktop");
      } else {
      }

      function populateImages() {
        let mainString = "./assets/GRAND_MENU_2021/GRAND_MENU_2021";
        let innerhtml = "";
        for (let i = 1; i <= totalPages; i++) {
          let src = `${mainString}-${i.toString().padStart(2, "0")}.jpg`;
          innerhtml += `<div class="page">`;
          innerhtml += `<img src='${src}' draggable='false' alt=''/>`;
          innerhtml += `</div>`;
        }
        $("#flipbook").append(innerhtml);
      }

      function isSingle() {
        return $("#flipbook").turn("display") == "single";
      }

      function resize() {
        let computedHeight = (document.body.offsetHeight - 650) / 2;
        $(".bars").css("height", `${computedHeight}px`);
        $(".flipbook").css("margin-top", `${computedHeight}px`);
      }

      function init() {
        $("#max").text(totalPages);
        let flipbookEL = document.getElementById("flipbook");
        let audio = new Audio("./assets/pageflip.mp3");
        window.addEventListener("resize", resize);
        resize();

        $("#flipbook").turn({
          height: 650,
          width: isMobile ? 350 : 700,
          display: isMobile ? "single" : "double",
          autoCenter: true,
          gradients: true,
          elevation: 50,
          inclination: 10,
          pages: totalPages,
          when: {
            turned: function (e, page) {
              if (isSingle() || page == 1 || page == totalPages) {
                $("#current").text(page);
              } else {
                $("#current").text(
                  `${Math.floor(page / 2) * 2}-${Math.floor(page / 2) * 2 + 1}`
                );
              }
            },
          },
        });

        $("#flipbook").on("turning", () => {
          audio.play();
        });

        let computedHeight = (document.body.offsetHeight - 650) / 2;
        $(".bars").css("height", `${computedHeight}px`);
        $("#wr").css("height", `${computedHeight}px`);

        // legit
        $("#right-arrow").on("click", next);
        $("#left-arrow").on("click", prev);

        $("#right").on("click", next);
        $("#rightArrow").on("click", next);
        $("#left").on("click", prev);
        $("#leftArrow").on("click", prev);
        $("#left-end").on("click", () => {
          $("#flipbook").turn("page", 1);
        });
        $("#right-end").on("click", () => {
          $("#flipbook").turn("page", totalPages);
        });

        function prev() {
          if ($("#flipbook").turn("view")[0] != 0) {
            $("#flipbook").turn("previous");
          } else {
            alert("You are on the first page!");
          }
        }

        function next() {
          if (
            $("#flipbook").turn("view")[0] !=
            (isSingle() ? totalPages : totalPages - 1)
          ) {
            $("#flipbook").turn("next");
          } else {
            alert("You are on the last page!");
          }
        }
      }
      populateImages();
      init();
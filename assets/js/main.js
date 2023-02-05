(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
  /**
   * Language sect
   */
  var arrLang = {
    "en-gb": {
      HOME: "Home",
      ABOUT: "About Us",
      APPLY: "Apply For Whitelist",
      LOGO: "Krane Kombat",
      LEGEND: "The Legendary Krane",
      MOTTO: "The Rise Of A New Dawn.", 
      DIVIDER: "Legendary Crane - Raijin",
      FIRSTHALF: `Chaos had spread throughout the land. Following a well-publicized invasion of the Crane clan by a foreign army, which resulted in the destruction of much of the Crane culture, the Japanese were ruled by cruelty and greed, which included the looting of their works of art (or Geijutsu sakuhin) and natural resources, causing ethnic strife and poverty. To give the Cranes an opportunity to regain their sense of pride and nationalism, the foreign army made the decision to pit their troops against the last remaining Japanese survivors in a fighting arena. The Japanese were significantly overwhelmed.
      The legendary Krane Lord Raijin, a martial arts coach, competed in matches against combatants from the foreign troops that received extensive media coverage. Raijin won after a series of battles in several rounds.`,
      SECONDHALF: `The Foreigners attempted to defraud the winner, Raijin, since they were unwilling to accept their defeat. However, when the Japanese had had enough, they united under the leadership of Raijin and rose up in rebellion against the foreign force. After a brutal battle, they were able to defeat the alien monarch and his troops.
      Ultimately, after the foreign troops withdrew, the Japanese were able to get above their poverty and racial divide, and they went on to create a new empire based on justice and equality for everyone. The people lived happily, unencumbered by outside oppression, for they were all united in their shared hope for a better future. Raijin—the legendary Krane—is to be thanked for everything.`,
      SUB: "Join Our Newsletter",
      LSUB: "Join Us For Important Updates"
    },
    "zh-tw": {
      HOME: "家",
      ABOUT: "私たちに関しては",
      APPLY: "ホワイトリストに申し込む",
      LOGO: "クレーン戦闘",
      LEGEND: "伝説の鶴",
      MOTTO: "新しい夜明けの台頭",
      DIVIDER: "伝説の鶴 - 雷神",
      FIRSTHALF:  `混沌は国中に広がっていた。 よく知られた外国人によるツル一族への侵略に続いて
      軍隊、どの
      ツル文化の多くが破壊され、日本人は残酷さと貪欲に支配され、
      含まれていた
      彼らの芸術作品（または芸術作品）と天然資源の略奪、民族紛争と
      貧困。 に
      クレーンに誇りとナショナリズムの感覚を取り戻す機会を与えるために、外国軍は
      ピットインの決定
      彼らの軍隊は、戦闘場で最後に残った日本人の生存者に対して。 日本人は
      大幅
      圧倒する。
      格闘技のコーチである伝説のクレーン ロード ライジンは、
      外国軍
      メディアで大々的に取り上げられたこと。 雷神は、数ラウンドの一連の戦いの後に勝ちました。`,
      SECONDHALF: `フォーリナーズは、敗北を受け入れたくなかったため、勝者であるライジンをだまそうとしました。
      ただし、
      日本人は飽き飽きし、雷神の指導の下で団結し、反乱を起こした
      外国人
      力。 残忍な戦いの後、彼らはエイリアンの君主と彼の軍隊を打ち負かすことができました.
      最終的に、外国軍が撤退した後、日本人は貧困から抜け出し、
      人種差別、そして
      彼らは正義と万人の平等に基づく新しい帝国を築き上げました。 人々は幸せに暮らし、
      邪魔されない
      彼らは皆、より良い未来への共通の希望で団結していたからです。 雷神—
      伝説のクレイン—は
      すべてに感謝すること。`,
      SUB: "ニュースレターに参加する", 
      LSUB: "重要なアップデートにご参加ください"
    }
  };
  
  $(document).ready(function () {
    // The default language is English
    var lang = "en-gb";
    $(".lang").each(function (index, element) {
      $(this).text(arrLang[lang][$(this).attr("key")]);
    });
  });
  
  // get/set the selected language
  $(".translate").click(function () {
    var lang = $(this).attr("id");
  
    $(".lang").each(function (index, element) {
      $(this).text(arrLang[lang][$(this).attr("key")]);
    });
  });
  

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

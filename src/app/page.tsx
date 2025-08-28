"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";

function Countdown({ target }: { target: string }) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  // Initialize deterministically to avoid SSR/CSR mismatch
  const [remainingMs, setRemainingMs] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setRemainingMs(Math.max(targetTime - now, 0));
    };
    // Set immediately on mount, then every second
    update();
    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const itemStyle: React.CSSProperties = {
    width: 120,
    height: 120,
    padding: 12,
    borderRadius: "50%",
    background: "#faeee0",
    color: "#8b272e",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    marginTop: 8,
    color: "#8b272e",
    opacity: 0.9,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 42,
    fontWeight: 700,
    lineHeight: 1,
  };

  return (
    <div
      className="countdown"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 62,
        flexWrap: "wrap",
        marginTop: 16,
        fontFamily: "Times New Roman",
      }}
    >
      <div className="countdown-item" style={itemStyle}>
        <div className="countdown-value" style={valueStyle}>
          {String(days).padStart(2, "0")}
        </div>
        <div className="countdown-label" style={labelStyle}>
          Hari
        </div>
      </div>
      <div className="countdown-item" style={itemStyle}>
        <div className="countdown-value" style={valueStyle}>
          {String(hours).padStart(2, "0")}
        </div>
        <div className="countdown-label" style={labelStyle}>
          Jam
        </div>
      </div>
      <div className="countdown-item" style={itemStyle}>
        <div className="countdown-value" style={valueStyle}>
          {String(minutes).padStart(2, "0")}
        </div>
        <div className="countdown-label" style={labelStyle}>
          Menit
        </div>
      </div>
      <div className="countdown-item" style={itemStyle}>
        <div className="countdown-value" style={valueStyle}>
          {String(seconds).padStart(2, "0")}
        </div>
        <div className="countdown-label" style={labelStyle}>
          Detik
        </div>
      </div>
    </div>
  );
}

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array gambar untuk gallery (Anda bisa mengganti dengan foto-foto yang sebenarnya)
  const images = ["/images/image-1.jpg", "/images/image-2.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000); // Ganti gambar setiap 4 detik

    return () => clearInterval(timer);
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div
      className="image-slider-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "40px",
        padding: "0 20px",
      }}
    >
      {/* Main Image Container */}
      <div
        className="image-slider-main"
        style={{
          position: "relative",
          width: "100%",
          height: "680px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(139, 39, 46, 0.3)",
          border: "3px solid rgba(255, 255, 255, 0.8)",
          background: "linear-gradient(135deg, #faeee0 0%, #f7ebdf 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(139, 39, 46, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 39, 46, 0.05) 0%, transparent 50%)",
            zIndex: 1,
          }}
        />

        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentIndex ? 1 : 0,
              transform: index === currentIndex ? "scale(1)" : "scale(1.1)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 2,
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                fill
                style={{
                  objectFit: "cover",
                  filter: "brightness(1.05) contrast(1.1)",
                }}
                priority={index === 0}
              />
            </div>
            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.3))",
                zIndex: 3,
              }}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="image-slider-nav-button"
          onClick={goToPrevious}
          style={{
            position: "absolute",
            left: "25px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.95)",
            border: "2px solid rgba(139, 39, 46, 0.3)",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "#8b272e",
            zIndex: 10,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 39, 46, 0.1)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.95)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          ‹
        </button>

        <button
          className="image-slider-nav-button"
          onClick={goToNext}
          style={{
            position: "absolute",
            right: "25px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.95)",
            border: "2px solid rgba(139, 39, 46, 0.3)",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "#8b272e",
            zIndex: 10,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 39, 46, 0.1)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.95)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      <div
        className="image-slider-dots"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          gap: "15px",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "20px" : "14px",
              height: "14px",
              borderRadius: "7px",
              border: "none",
              background:
                index === currentIndex
                  ? "linear-gradient(135deg, #8b272e, #e69093)"
                  : "rgba(139, 39, 46, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
              boxShadow:
                index === currentIndex
                  ? "0 2px 8px rgba(139, 39, 46, 0.4)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Floating Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "-15px",
          left: "10%",
          width: "30px",
          height: "30px",
          background:
            "radial-gradient(circle, rgba(139, 39, 46, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "15%",
          width: "20px",
          height: "20px",
          background:
            "radial-gradient(circle, rgba(230, 144, 147, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 4s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [ucapanList] = useState([
    // contoh data awal (opsional)
    {
      id: 1,
      nama: "Aulia",
      isi: "Selamat menempuh hidup baru!",
      waktu: new Date(),
    },
    {
      id: 2,
      nama: "Bima",
      isi: "Semoga langgeng dan bahagia selalu.",
      waktu: new Date(),
    },
    {
      id: 3,
      nama: "Citra",
      isi: "Turut berbahagia! See you di resepsi.",
      waktu: new Date(),
    },
    {
      id: 4,
      nama: "Dewi",
      isi: "Semoga kedua anda selalu bahagia bersama.",
      waktu: new Date(),
    },
    {
      id: 5,
      nama: "Eko",
      isi: "Semoga kedua anda selalu bahagia bersama.",
      waktu: new Date(),
    },
  ]);
  const sliderRef = useRef(null);
  const [showWalletPopup, setShowWalletPopup] = useState(false);

  // Trigger animations only when section becomes active
  useEffect(() => {
    const ANIM_CLASS_NAMES = [
      "slide-in-left",
      "slide-in-right",
      "love-bounce",
      "bismillah-fade",
      "heading-fade",
      "figura-fade",
      "ayat-fade",
      "save-date-animate",
      "save-date-details",
      "save-date-date",
      "save-date-time",
      "save-date-venue",
      "save-date-address",
      "save-date-cta",
      "save-date-countdown",
      "save-date-love",
      "rsvp-title-animate",
      "rsvp-fade",
      "rsvp-field-animate",
      "rsvp-cta-animate",
      "rsvp-history-animate",
      "gift-title-animate",
      "gift-text-animate",
      "gift-image-animate",
      "footer-brand-animate",
      "footer-social-animate",
    ];

    const isAnimClass = (token: string) => ANIM_CLASS_NAMES.includes(token);

    const allAnimated = Array.from(
      document.querySelectorAll(ANIM_CLASS_NAMES.map((c) => `.${c}`).join(","))
    ) as HTMLElement[];

    // strip anim classes and remember them in data-anim
    allAnimated.forEach((el) => {
      const tokens = Array.from(el.classList).filter(isAnimClass);
      if (tokens.length > 0) {
        el.dataset.anim = tokens.join(" ");
        tokens.forEach((t) => el.classList.remove(t));
      }
    });

    const sectionSelectors = [
      ".save-the-date",
      ".section-couple",
      ".section-ayat",
      ".section-gallery",
      ".rsvp-section",
      ".wedding-gift-section",
      ".footer-section",
    ];

    const sections = Array.from(
      document.querySelectorAll(sectionSelectors.join(","))
    ) as HTMLElement[];

    const activate = (section: HTMLElement) => {
      const targets = Array.from(
        section.querySelectorAll("[data-anim]")
      ) as HTMLElement[];
      targets.forEach((el) => {
        const anim = el.dataset.anim || "";
        if (anim) {
          anim.split(/\s+/).forEach((t) => t && el.classList.add(t));
          // allow CSS selectors like .in-view
          el.classList.add("in-view");
          // clear so it won't be re-added excessively
          delete el.dataset.anim;
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            activate(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => io.observe(sec));

    return () => io.disconnect();
  }, []);

  // format waktu singkat
  const fmt = (d: Date) =>
    new Date(d).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const maxIndex = Math.max(0, ucapanList.length - 1);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    // setCurrent(clamped); // This line was removed as per the edit hint
    // scroll ke kartu aktif
    const wrap = sliderRef.current;
    if (wrap) {
      const card = (wrap as HTMLElement).querySelector(
        `[data-index="${clamped}"]`
      );
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        overflowY: "scroll",
        // scrollSnapType: "y mandatory",
      }}
    >
      {/* Landing Page */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faeee0",
        }}
      >
        <div
          className="decor-left"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <img
            src="/images/dekorasi.png"
            alt="Dekorasi pita"
            className="decor-left"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right center",
              display: "block",
            }}
          />
        </div>
        <div
          className="decor-right"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <img
            src="/images/dekorasi.png"
            alt="Dekorasi pita"
            className="decor-right"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
              display: "block",
            }}
          />
        </div>

        <div
          className="hero-content"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <h1
            className="font-belleza wave-in"
            style={{ fontSize: 64, color: "#000000", marginBottom: 12 }}
          >
            THE WEDDING OF
          </h1>
          <div
            className="font-buffalo zoom-in hero-name"
            style={{
              color: "#000000",
              fontSize: 124,
            }}
          >
            Rania
          </div>
          <div
            className="font-buffalo zoom-in"
            style={{
              color: "#000000",
              fontSize: 124,
              margin: "0 10px",
              lineHeight: 1,
            }}
          >
            &
          </div>
          <div
            className="font-buffalo zoom-in hero-name"
            style={{ color: "#000000", fontSize: 124 }}
          >
            Barra
          </div>
          <button
            className="hero-button font-belleza wave-in"
            style={{
              backgroundColor: "transparent",
              color: "#000000",
              padding: 10,
              width: 400,
              borderRadius: 14,
              fontSize: 42,
              cursor: "pointer",
              marginTop: 20,
              border: "2px solid #8b272e",
            }}
          >
            Buka Undangan
          </button>
        </div>
      </section>

      {/* Nama Mempelai*/}
      <section
        className="section-couple"
        style={{
          minHeight: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e69093",
          overflow: "hidden",
        }}
      >
        <div
          className="couple-section"
          style={{
            width: "100%",
            maxWidth: 1100,
            padding: 16,
            position: "relative",
          }}
        >
          <img
            src="/images/bismillah.png"
            alt="Bismillah"
            className="bismillah-fade"
            style={{
              position: "absolute",
              top: -200,
              left: "50%",
              transform: "translateX(-50%)",
              maxWidth: 920,
              width: "80%",
              height: "auto",
              objectFit: "contain",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
          {/* Heading di atas bride & groom - di luar grid */}
          <div
            style={{
              textAlign: "center",
              color: "#000",
              marginBottom: 32,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              className="heading-section font-belleza heading-fade"
              style={{
                fontSize: 26,
                lineHeight: 1.5,
                maxWidth: 1200,
                margin: "0 auto",
                color: "#faeee0",
              }}
            >
              Dengan rahmat dan ridho Allah SWT kami bermaksud menyelenggarakan
              pernikahan Putra & Putri kami yang bernama :
            </div>
          </div>

          {/* Love icon centered between bride and groom */}
          <img
            src="/images/love.png"
            alt="Love"
            className="love-bounce"
            style={{
              position: "absolute",
              left: "50%",
              top: "70%",
              transform: "translate(-50%, -50%)",
              width: 92,
              height: 92,
              objectFit: "contain",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Pita kiri di pojok kiri bawah */}
          <img
            className="decor-left"
            src="/images/pita_kiri.png"
            alt="Pita Dekorasi Kiri"
            style={{
              position: "absolute",
              left: -500,
              bottom: -1100,
              width: "100%",
              maxWidth: 1500,
              height: "auto",
              objectFit: "contain",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <img
            className="decor-right"
            src="/images/pita_kanan.png"
            alt="Pita Dekorasi Kanan"
            style={{
              position: "absolute",
              right: -800,
              bottom: -800,
              width: "120%",
              maxWidth: 1500,
              height: "auto",
              objectFit: "contain",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <div
            className="couple-grid"
            style={{
              display: "grid",
              gap: 24,
              alignItems: "center",
            }}
          >
            {/* Kiri teks */}
            <div
              className="side-text slide-in-left"
              style={{ textAlign: "right", color: "#000" }}
            >
              <div
                className="font-buffalo"
                style={{
                  fontSize: 52,
                  marginBottom: 8,
                  color: "#faeee0",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                Rania Sarah
              </div>
              <div
                className="font-belleza"
                style={{ fontSize: 24, marginTop: 10 }}
              >
                <div style={{ marginBottom: 6 }}>Putri tercinta dari :</div>
                <div>Bapak Bowo</div>
                <div>Ibu Tina</div>
              </div>
            </div>

            {/* Bride circle */}
            <div
              className="profile-circle slide-in-left"
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                backgroundColor: "#f7ebdf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <span style={{ color: "#333", fontSize: 18 }}>bride</span>
            </div>

            {/* Groom circle */}
            <div
              className="profile-circle slide-in-right"
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                backgroundColor: "#f7ebdf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <span style={{ color: "#333", fontSize: 18 }}>Groom</span>
            </div>

            {/* Kanan teks */}
            <div
              className="side-text slide-in-right"
              style={{ textAlign: "left", color: "#000" }}
            >
              <div
                className="font-buffalo"
                style={{
                  fontSize: 52,
                  marginBottom: 8,
                  color: "#faeee0",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                Barra Widianto
              </div>
              <div
                className="font-belleza"
                style={{ fontSize: 24, marginTop: 10 }}
              >
                <div style={{ marginBottom: 6 }}>Putra tercinta dari :</div>
                <div>Bapak Widianto</div>
                <div>Ibu Nina</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ayat Al-Qur'an */}
      <section
        className="section-ayat"
        style={{
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faeee0",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Figura dekoratif di belakang */}
        <img
          src="/images/figura.png"
          alt="Figura Dekoratif"
          className="figura-left-fade"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 1000,
            height: "auto",
            objectFit: "contain",
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.8,
          }}
        />

        <div
          className="ayat-al-quran ayat-fade"
          style={{
            padding: "60px 600px",
            position: "relative",
            zIndex: 1,
            fontFamily: "Times New Roman",
            fontStyle: "italic",
            fontSize: 32,
            color: "#faeee0",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
            pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu
            merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan
            kasih sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </p>
          <h1 style={{ textAlign: "center", marginTop: 20 }}>
            (QS AR-RUM : 21 )
          </h1>
        </div>
      </section>

      {/* Save The Date */}
      <section
        className="save-the-date"
        style={{
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e69093",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pita putih di pojok kiri bawah */}
        <img
          src="/images/pita-putih.png"
          alt="Pita Putih Dekorasi"
          className="decor-left"
          style={{
            position: "absolute",
            left: -1200,
            bottom: -800,
            width: "100%",
            maxWidth: 3000,
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.95,
          }}
        />
        <div className="save-the-date__inner">
          <div
            style={{
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <span
              className="font-buffalo save-the-date__word save-the-date__word--save save-date-animate"
              style={{
                fontSize: 150,
                color: "#faeee0",
                position: "relative",
                top: -40,
                display: "inline-block",
              }}
            >
              <Image
                src="/images/love.png"
                alt="Love decor"
                className="save-date-love"
                width={120}
                height={120}
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "35%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 0,
                  pointerEvents: "none",
                  filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))",
                  rotate: "10deg",
                  height: "auto",
                  width: "auto",
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Save</span>
            </span>
            <span
              className="save-the-date__word save-the-date__word--the save-date-animate"
              style={{
                margin: "0 8px",
                fontSize: 70,
                fontFamily: '"Times New Roman", Times, serif',
                display: "inline-block",
                transform: "rotate(-15deg)",
                color: "#8b272e",
              }}
            >
              the
            </span>
            <span
              className="font-buffalo save-the-date__word save-the-date__word--date save-date-animate"
              style={{
                fontSize: 150,
                color: "#000000",
                position: "relative",
                top: 20,
              }}
            >
              Date
            </span>
          </div>
          <div
            className="save-the-date__details save-date-details"
            style={{ textAlign: "center", color: "#ffffff" }}
          >
            <h2
              className="save-the-date__date save-date-date"
              style={{
                fontSize: 60,
                fontFamily: "Times New Roman",
                letterSpacing: 20,
                color: "#000000",
              }}
            >
              3 | SEPTEMBER | 2025
            </h2>

            <h2
              className="font-buffalo save-the-date__time save-date-time"
              style={{
                fontSize: 80,
                color: "#faeee0",
                letterSpacing: 10,
              }}
            >
              08.00 - 13.00
            </h2>
            <h2
              className="font-buffalo save-the-date__venue save-date-venue"
              style={{
                fontSize: 80,
                color: "#8b272e",
                letterSpacing: 10,
                fontWeight: 600,
              }}
            >
              Hotel Harris
            </h2>
            <h2
              className="save-the-date__address save-date-address"
              style={{
                fontFamily: "Times New Roman",
                color: "#faeee0",
                fontSize: 30,
              }}
            >
              Jl. Peta No.241, Suka Asih, Bojongloa Kaler, Bandung City
            </h2>
            <button
              className="hero-button font-belleza save-the-date__cta save-date-cta"
              style={{
                backgroundColor: "transparent",
                padding: 18,
                width: 300,
                borderRadius: 20,
                fontSize: 28,
                color: "#faeee0",
                cursor: "pointer",
                marginTop: 20,
                border: "2px solid #8b272e",
              }}
            >
              LIHAT LOKASI
            </button>
            {/* countdown timer */}
            <div className="save-date-countdown">
              <Countdown target="2025-09-03T10:00:00+07:00" />
            </div>
          </div>
        </div>
      </section>
      {/* Our Gallery */}
      <section
        className="section-gallery"
        style={{
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faeee0",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            className="heading-our-gallery font-buffalo our-gallery-fade"
            style={{
              fontSize: 80,
              color: "#8b272e",
              letterSpacing: 10,
            }}
          >
            Our Gallery
          </h1>
        </div>
        <ImageSlider />
      </section>
      {/* RSVP */}
      <section
        className="rsvp-section"
        style={{
          minHeight: "160vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e69093",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/pita-putih.png"
          alt="Pita Putih Dekorasi"
          className="decor-right"
          style={{
            position: "absolute",
            right: -1200,
            width: "100%",
            maxWidth: 3000,
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.95,
          }}
        />
        <div
          className="rsvp-container"
          style={{
            color: "#ffffff",
            textAlign: "center",
            padding: "0 20px",
            maxWidth: 1500,
            width: "100%",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div
            className="curved-title-2 rsvp-title-animate"
            id="method2"
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            <svg width="300" height="80" viewBox="0 0 300 80">
              <defs>
                <path id="curve" d="M 50,60 Q 150,20 250,60" />
              </defs>
              <text className="curved-text">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  RSVP
                </textPath>
              </text>
            </svg>
          </div>

          <p
            className="rsvp-intro font-belleza rsvp-fade"
            style={{ fontSize: 20, color: "#000000", marginBottom: 28 }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/ibu/Saudara/i berkenan hadir ke acara bahagia kami untuk
            tentunya memberikan doa restu kepada kedua mempelai. Atas kehadiran
            serta doa restu, kami ucapkan terima kasih yang terdalam.
          </p>

          {/* FORM RSVP */}
          <form
            className="rsvp-form font-belleza rsvp-fade"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const data = {
                nama: form.get("nama"),
                jumlahTamu: Number(form.get("jumlahTamu")),
                kehadiran: form.get("kehadiran"), // "hadir" | "tidak"
              };
              console.log("RSVP submitted:", data);
              alert("Terima kasih! RSVP kamu sudah terkirim.");
            }}
            style={{
              display: "grid",
              gap: 16,
              marginTop: 8,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <label
                htmlFor="nama"
                style={{ display: "block", marginBottom: 6 }}
              >
                Nama
              </label>
              <input
                className="rsvp-input rsvp-field-animate"
                id="nama"
                name="nama"
                type="text"
                required
                placeholder="Tuliskan nama lengkap"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 20,
                  border: "2px solid #8b272e",
                  background: "#faeee0",
                  color: "#8b272e",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label
                htmlFor="jumlahTamu"
                style={{ display: "block", marginBottom: 6 }}
              >
                Jumlah Tamu
              </label>
              <input
                className="rsvp-input rsvp-field-animate"
                id="jumlahTamu"
                name="jumlahTamu"
                type="number"
                min={1}
                required
                placeholder="Misal: 2"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 20,
                  border: "2px solid #8b272e",
                  background: "#faeee0",
                  color: "#8b272e",
                  outline: "none",
                }}
              />
            </div>

            <fieldset
              className="rsvp-fieldset rsvp-field-animate"
              style={{
                border: "0px solid #8b272e",
                borderRadius: 20,
                padding: 14,
                textAlign: "left",
              }}
            >
              <legend style={{ padding: "0px 6px" }}>Kehadiran</legend>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <input
                  className="rsvp-radio"
                  type="radio"
                  name="kehadiran"
                  value="hadir"
                  required
                />
                Hadir
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  className="rsvp-radio"
                  type="radio"
                  name="kehadiran"
                  value="tidak"
                />
                Maaf, tidak bisa hadir
              </label>
            </fieldset>

            <div style={{ marginTop: 20, textAlign: "center" }}>
              <h1
                className="rsvp-wishes-title rsvp-title-animate"
                style={{
                  fontSize: 62,
                  fontFamily: "Times New Roman",
                  letterSpacing: 10,
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#faeee0" }}>UCAPAN &</span>{" "}
                <span style={{ color: "#8b272e" }}>DOA</span>
              </h1>
              {/* form ucapan */}
              <div>
                <textarea
                  className="rsvp-textarea rsvp-field-animate"
                  placeholder="Tuliskan ucapan dan doa"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 20,
                    border: "2px solid #8b272e",
                    background: "#faeee0",
                    color: "#8b272e",
                    outline: "none",
                    height: 300,
                    resize: "none",
                    fontSize: 24,
                    marginTop: 20,
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <button
                  type="submit"
                  className="rsvp-submit rsvp-cta-animate"
                  style={{
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: "2px solid #faeee0",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 600,
                    backgroundColor: "#8b272e",
                    color: "#faeee0",
                    width: "50%",
                    margin: "0 auto",
                  }}
                >
                  KIRIM
                </button>
              </div>

              {/* history ucapan */}
              <div style={{ marginTop: 30 }}>
                <h3
                  className="history-ucapan-title font-buffalo rsvp-title-animate"
                  style={{
                    fontSize: 80,
                    color: "#8b272e",

                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Ucapan & Doa Tamu
                </h3>

                <div
                  ref={sliderRef}
                  className="history-ucapan-container rsvp-history-animate"
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "20px",
                    padding: "20px 0",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#8b272e #faeee0",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {ucapanList.map((ucapan, index) => (
                    <div
                      key={ucapan.id}
                      data-index={index}
                      className="history-ucapan-card"
                      style={{
                        minWidth: "80px",
                        maxWidth: "320px",
                        flex: "0 0 auto",
                        background: "#faeee0",
                        borderRadius: "20px",
                        padding: "20px",
                        border: "2px solid rgba(139, 39, 46, 0.3)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#8b272e",
                          }}
                        >
                          {ucapan.nama}
                        </div>
                      </div>
                      <p
                        style={{
                          color: "#333",
                          fontSize: "16px",
                          lineHeight: "1.5",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {ucapan.isi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Wedding Gift e Wallet */}
      <section
        className="wedding-gift-section"
        style={{
          minHeight: "60vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faeee0",
        }}
      >
        <div
          className="wedding-gift-container"
          style={{
            color: "#000000",
            textAlign: "center",
            width: "100%",
            padding: "0 200px",
            maxWidth: 1500,
            marginBottom: 0,
          }}
        >
          <h1
            className="gift-title-animate"
            style={{
              fontSize: 62,
              fontFamily: "Times New Roman",
              color: "#8b272e",
              marginBottom: 40,
            }}
          >
            Wedding Gift
          </h1>
          <span
            className="font-belleza gift-text-animate"
            style={{ fontSize: 24, color: "#000000", marginBottom: 28 }}
          >
            Doa, restu dan kehadiran Bapak/Ibu/Saudara/i saat berarti bagi
            kebahagiaan kami. Namun Jika ingin memberikan hadiah untuk kami,
            kami sediakan fitur di bawah ini :
          </span>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Image
              className="gift-image-animate"
              src="/images/wallet.png"
              alt="e-wallet"
              width={200}
              height={200}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                height: "auto",
                marginTop: 40,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1)";
              }}
              onClick={() => setShowWalletPopup(true)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="footer-section"
        style={{
          backgroundColor: "#e69093",
          color: "#ffffff",
          padding: "20px 0",
        }}
      >
        <div
          className="footer-brand-animate"
          style={{
            maxWidth: 1500,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src="/images/logo.png" alt="footer" width={100} height={100} />
          <p
            className="font-theseason"
            style={{ fontSize: 54, fontWeight: 600, marginLeft: 10 }}
          >
            Indearday
          </p>
        </div>
        <div
          className="footer-social-animate"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            src="/images/instagram.png"
            alt="instagram"
            width={30}
            height={30}
          />
          <p
            className="font-belleza"
            style={{
              fontSize: 20,
              marginLeft: 10,
              color: "#8b272e",
              textDecoration: "underline",
            }}
          >
            indearday
          </p>
        </div>
      </footer>

      {/* E-Wallet Popup */}
      {showWalletPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setShowWalletPopup(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #faeee0 0%, #f7ebdf 100%)",
              borderRadius: "25px",
              padding: "40px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "3px solid #8b272e",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowWalletPopup(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "rgba(139, 39, 46, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#8b272e",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 39, 46, 0.2)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 39, 46, 0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "32px",
                  color: "#8b272e",
                  marginBottom: "10px",
                  fontFamily: "Times New Roman",
                  fontWeight: "600",
                }}
              >
                Transfer Bank
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                Doa dan restu adalah hadiah terindah, namun jika ingin
                memberikan hadiah lainnya
              </p>
            </div>
            <div>
              {/* Bank Transfer */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "15px",
                  padding: "20px",
                  marginBottom: "15px",
                  border: "2px solid rgba(139, 39, 46, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(139, 39, 46, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => {
                  navigator.clipboard.writeText("1234-5678-9012-3456");
                  alert("Nomor rekening berhasil disalin!");
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      BCA
                    </div>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      1234-5678-9012-3456
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8b272e",
                        fontWeight: "600",
                      }}
                    >
                      a.n. Rania Sarah
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8b272e",
                      fontWeight: "600",
                    }}
                  >
                    <button
                      style={{
                        background: "#faeee0",
                        border: "none",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#8b272e",
                      }}
                    >
                      Salin
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                background: "rgba(139, 39, 46, 0.1)",
                borderRadius: "15px",
                border: "1px solid rgba(139, 39, 46, 0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#8b272e",
                  lineHeight: "1.5",
                  fontFamily: "Times New Roman",
                }}
              >
                Terima kasih atas doa, restu, dan hadiah yang diberikan. Semoga
                menjadi berkah untuk pernikahan kami. Aamiin
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

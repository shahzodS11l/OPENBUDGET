import { useMemo, useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullname: "",
    region: "",
    phone: "",
    password: "",
  });

  const stats = [
    { title: "Jami byudjet", value: "1.8 trln so'm", sub: "2026 yil uchun" },
    { title: "Faol loyihalar", value: "18 245", sub: "respublika bo'yicha" },
    { title: "Ovozlar", value: "7.4 mln", sub: "fuqarolar ishtiroki" },
    { title: "Hududlar", value: "14", sub: "viloyat va hududlar" },
  ];

  const projects = [
    {
      id: 1,
      title: "Mahalla yo'llarini ta'mirlash",
      region: "Jizzax shahri",
      budget: "420 mln so'm",
      votes: "12 540",
      status: "Faol ovoz berish",
      progress: 78,
      desc: "Ichki ko'chalarni ta'mirlash va piyodalar uchun qulay yo'lak yaratish loyihasi.",
    },
    {
      id: 2,
      title: "Maktab kompyuter sinfi",
      region: "Zomin tumani",
      budget: "310 mln so'm",
      votes: "8 920",
      status: "Tasdiqlangan",
      progress: 64,
      desc: "Maktab uchun yangi kompyuterlar, proyektor va internet jihozlarini xarid qilish.",
    },
    {
      id: 3,
      title: "Ichimlik suvi tarmog'i",
      region: "Forish tumani",
      budget: "560 mln so'm",
      votes: "15 220",
      status: "Ko'rib chiqilmoqda",
      progress: 89,
      desc: "Yangi suv quvurlari tortish va mavjud tarmoqni modernizatsiya qilish.",
    },
    {
      id: 4,
      title: "Tibbiyot punktini jihozlash",
      region: "G'allaorol tumani",
      budget: "285 mln so'm",
      votes: "6 740",
      status: "Faol ovoz berish",
      progress: 52,
      desc: "Birlamchi tibbiy xizmat uchun zamonaviy uskunalar va mebel jihozlari.",
    },
    {
      id: 5,
      title: "Yoshlar sport maydonchasi",
      region: "Samarqand viloyati",
      budget: "390 mln so'm",
      votes: "10 180",
      status: "Faol ovoz berish",
      progress: 71,
      desc: "Mini futbol, basketbol va workout zonalari bilan sport maydonchasi qurilishi.",
    },
    {
      id: 6,
      title: "Ko'cha yoritish tizimi",
      region: "Buxoro shahri",
      budget: "260 mln so'm",
      votes: "7 410",
      status: "Tasdiqlangan",
      progress: 61,
      desc: "LED yoritgichlar o'rnatish va tungi xavfsizlikni oshirish loyihasi.",
    },
  ];

  const [voteCounts, setVoteCounts] = useState(() => {
    const initial = {};
    for (const project of projects) {
      initial[project.id] = Number(project.votes.replace(/\s/g, ""));
    }
    return initial;
  });

  const formatVotes = (num) => {
    return num.toLocaleString("ru-RU").replace(/,/g, " ");
  };

  const handleVote = (projectId) => {
    setVoteCounts((prev) => ({
      ...prev,
      [projectId]: prev[projectId] + 1,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginData.phone || !loginData.password) {
      alert("Telefon raqam va parolni to'ldiring.");
      return;
    }

    setUser({
      name: "Foydalanuvchi",
      phone: loginData.phone,
    });

    setLoginData({ phone: "", password: "" });
    setModal(null);
    alert("Muvaffaqiyatli kirdingiz.");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      !registerData.fullname ||
      !registerData.region ||
      !registerData.phone ||
      !registerData.password
    ) {
      alert("Barcha maydonlarni to'ldiring.");
      return;
    }

    setUser({
      name: registerData.fullname,
      phone: registerData.phone,
      region: registerData.region,
    });

    setRegisterData({
      fullname: "",
      region: "",
      phone: "",
      password: "",
    });
    setModal(null);
    alert("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.");
  };

  const logout = () => {
    setUser(null);
    alert("Akkauntdan chiqdingiz.");
  };

  const selectedPageTitle = useMemo(() => {
    if (page === "projects") return "Loyihalar sahifasi";
    if (page === "stats") return "Statistika sahifasi";
    if (page === "results") return "Natijalar sahifasi";
    if (page === "contact") return "Bog'lanish sahifasi";
    return "Bosh sahifa";
  }, [page]);

  const navButtonStyle = {
    color: "#e2e8f0",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #07111f 0%, #10233a 35%, #dfe9f3 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(14px)",
          background: "rgba(7, 17, 31, 0.82)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
            onClick={() => setPage("home")}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 10px 25px rgba(20,184,166,0.35)",
              }}
            >
              OB
            </div>
            <div>
              <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
                Open Budget
              </div>
              <div style={{ color: "#94a3b8", fontSize: "12px" }}>
                Shaffof byudjet platformasi
              </div>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              gap: "22px",
              flexWrap: "wrap",
              fontSize: "15px",
            }}
          >
            <button style={navButtonStyle} onClick={() => setPage("home")}>
              Bosh sahifa
            </button>
            <button style={navButtonStyle} onClick={() => setPage("projects")}>
              Loyihalar
            </button>
            <button style={navButtonStyle} onClick={() => setPage("stats")}>
              Statistika
            </button>
            <button style={navButtonStyle} onClick={() => setPage("results")}>
              Natijalar
            </button>
            <button style={navButtonStyle} onClick={() => setPage("contact")}>
              Bog'lanish
            </button>
          </nav>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {user ? (
              <>
                <div style={{ color: "white", fontSize: "14px" }}>
                  Salom, <strong>{user.name}</strong>
                </div>
                <button
                  onClick={logout}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Chiqish
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setModal("register")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Ro'yxatdan o'tish
                </button>
                <button
                  onClick={() => setModal("login")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(20,184,166,0.35)",
                  }}
                >
                  Kirish
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <section style={{ color: "white", padding: "72px 24px 120px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(20,184,166,0.14)",
                border: "1px solid rgba(45,212,191,0.28)",
                color: "#99f6e4",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              Fuqarolar ishtiroki • Ochiq nazorat • Raqamli platforma
            </div>

            <h1
              style={{
                fontSize: "58px",
                lineHeight: "1.08",
                margin: "0 0 18px",
                fontWeight: "bold",
                maxWidth: "700px",
              }}
            >
              Ochiq byudjet
              <br />
              uchun zamonaviy platforma
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "19px",
                lineHeight: "1.7",
                maxWidth: "720px",
                marginBottom: "28px",
              }}
            >
              Hududingizdagi dolzarb loyihalarni ko'ring, ovoz bering va
              byudjet mablag'lari qanday taqsimlanayotganini qulay va shaffof
              ko'rinishda kuzating.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "26px",
              }}
            >
              <button
                onClick={() => setPage("projects")}
                style={{
                  padding: "14px 24px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 12px 28px rgba(20,184,166,0.32)",
                }}
              >
                Loyihalarni ko'rish
              </button>

              <button
                onClick={() => setPage("results")}
                style={{
                  padding: "14px 24px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ovoz berish tartibi
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "28px",
                flexWrap: "wrap",
                color: "#cbd5e1",
              }}
            >
              <div>
                <div style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}>
                  7.4 mln+
                </div>
                <div>ovoz berilgan</div>
              </div>
              <div>
                <div style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}>
                  18 ming+
                </div>
                <div>loyiha joylangan</div>
              </div>
              <div>
                <div style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}>
                  14
                </div>
                <div>hudud qamrovi</div>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "28px",
                padding: "24px",
                backdropFilter: "blur(18px)",
                boxShadow: "0 25px 60px rgba(2,8,23,0.4)",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #0f172a, #132238)",
                  borderRadius: "22px",
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "14px" }}>
                      Eng faol loyiha
                    </div>
                    <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px" }}>
                      Ichimlik suvi tarmog'i
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(20,184,166,0.16)",
                      color: "#99f6e4",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      height: "fit-content",
                    }}
                  >
                    Top loyiha
                  </div>
                </div>

                <div style={{ color: "#cbd5e1", marginBottom: "10px" }}>
                  Hudud: Forish tumani
                </div>
                <div style={{ color: "#cbd5e1", marginBottom: "10px" }}>
                  Ajratilgan mablag': 560 mln so'm
                </div>
                <div style={{ color: "#cbd5e1", marginBottom: "18px" }}>
                  Jami ovozlar: {formatVotes(voteCounts[3])}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1280px", margin: "-70px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {stats.map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.92)",
                borderRadius: "24px",
                padding: "26px",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 16px 45px rgba(15,23,42,0.08)",
              }}
            >
              <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "12px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "34px", fontWeight: "bold", marginBottom: "8px" }}>
                {item.value}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "13px" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "46px 24px 20px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "24px",
            boxShadow: "0 16px 45px rgba(15,23,42,0.06)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "14px",
            }}
          >
            <input
              placeholder="Loyiha nomi bo'yicha qidirish"
              style={inputBaseStyle}
            />
            <select style={inputBaseStyle}>
              <option>Barcha hududlar</option>
              <option>Jizzax</option>
              <option>Samarqand</option>
              <option>Buxoro</option>
            </select>
            <select style={inputBaseStyle}>
              <option>Barcha statuslar</option>
              <option>Faol ovoz berish</option>
              <option>Tasdiqlangan</option>
              <option>Ko'rib chiqilmoqda</option>
            </select>
            <button
              style={{
                padding: "16px 24px",
                borderRadius: "14px",
                border: "none",
                background: "#0f766e",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Qidirish
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                color: "#0f766e",
                fontWeight: "bold",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              {selectedPageTitle.toUpperCase()}
            </div>
            <h2 style={{ fontSize: "38px", margin: 0 }}>Faol tashabbuslar</h2>
            <p style={{ color: "#64748b", marginTop: "10px" }}>
              Eng ko'p ovoz olayotgan va eng ko'p ko'rilayotgan loyihalar
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 14px 38px rgba(15,23,42,0.06)",
                border: "1px solid #e7edf4",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "start",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#ccfbf1",
                    color: "#115e59",
                    padding: "7px 12px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {project.status}
                </div>

                <div
                  style={{
                    color: "#0f766e",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {project.progress}%
                </div>
              </div>

              <h3
                style={{
                  fontSize: "25px",
                  lineHeight: "1.3",
                  marginTop: 0,
                  marginBottom: "14px",
                }}
              >
                {project.title}
              </h3>

              <div style={{ color: "#475569", marginBottom: "8px" }}>
                <strong>Hudud:</strong> {project.region}
              </div>
              <div style={{ color: "#475569", marginBottom: "8px" }}>
                <strong>Byudjet:</strong> {project.budget}
              </div>
              <div style={{ color: "#475569", marginBottom: "8px" }}>
                <strong>Ovozlar:</strong> {formatVotes(voteCounts[project.id])}
              </div>
              <div style={{ color: "#475569", marginBottom: "16px" }}>
                <strong>Tavsif:</strong> {project.desc}
              </div>

              <div
                style={{
                  height: "12px",
                  background: "#e2e8f0",
                  borderRadius: "999px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: `${project.progress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #14b8a6, #2dd4bf)",
                  }}
                />
              </div>

              <div
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  marginBottom: "18px",
                }}
              >
                Loyiha faolligi va fuqarolar qiziqishi
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => handleVote(project.id)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Ovoz berish
                </button>
                <button
                  onClick={() => setPage("results")}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1px solid #dbe4ee",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "30px 24px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "22px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "0 16px 45px rgba(15,23,42,0.06)",
            }}
          >
            <div
              style={{
                color: "#0f766e",
                fontWeight: "bold",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              JARAYON
            </div>
            <h2 style={{ fontSize: "34px", marginTop: 0 }}>Qanday ishlaydi?</h2>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              Platforma fuqarolar, hududlar va byudjet jarayonlarini yagona
              ochiq tizimda birlashtiradi.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                "Loyiha tanlanadi",
                "Fuqarolar ovoz beradi",
                "Natijalar saralanadi",
                "G'olib loyihalar moliyalashtiriladi",
              ].map((step, index) => (
                <div
                  key={step}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "18px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      marginBottom: "14px",
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3 style={{ margin: 0, fontSize: "20px" }}>{step}</h3>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              color: "white",
              borderRadius: "28px",
              padding: "30px",
              boxShadow: "0 20px 45px rgba(20,184,166,0.22)",
            }}
          >
            <div style={{ fontSize: "14px", opacity: 0.85, marginBottom: "10px" }}>
              PLATFORMA AFZALLIKLARI
            </div>
            <h2 style={{ fontSize: "34px", marginTop: 0 }}>Nega aynan biz?</h2>

            <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
              {[
                "Shaffof va zamonaviy interfeys",
                "Hududlar bo'yicha tezkor kuzatuv",
                "Fuqarolar uchun qulay ovoz berish",
                "Ma'lumotlar statistikasi va monitoring",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "18px",
                    padding: "16px 18px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => setModal("register")}
              style={{
                marginTop: "24px",
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                border: "none",
                background: "white",
                color: "#0f766e",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Platformani sinab ko'rish
            </button>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: "#07111f",
          color: "white",
          padding: "32px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>Open Budget</div>
            <div style={{ color: "#94a3b8", marginTop: "8px" }}>
              Ochiq byudjet platformasi uchun professional demo sahifa
            </div>
          </div>

          <div style={{ color: "#94a3b8" }}>
            © 2026 Open Budget. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>

      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 8, 23, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "white",
              borderRadius: "24px",
              padding: "26px",
              boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ margin: 0 }}>
                {modal === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
              </h2>
              <button
                onClick={() => setModal(null)}
                style={{
                  border: "none",
                  background: "#eef2f7",
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </div>

            {modal === "login" ? (
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefon raqam"
                  value={loginData.phone}
                  onChange={handleLoginChange}
                  style={inputStyle}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  style={inputStyle}
                />
                <button type="submit" style={submitButtonStyle}>
                  Kirish
                </button>
                <p style={{ color: "#64748b", textAlign: "center", marginTop: "14px" }}>
                  Akkaunt yo'qmi?{" "}
                  <span
                    onClick={() => setModal("register")}
                    style={{ color: "#0f766e", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Ro'yxatdan o'ting
                  </span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  name="fullname"
                  placeholder="To'liq ism"
                  value={registerData.fullname}
                  onChange={handleRegisterChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Hudud"
                  value={registerData.region}
                  onChange={handleRegisterChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefon raqam"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  style={inputStyle}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  style={inputStyle}
                />
                <button type="submit" style={submitButtonStyle}>
                  Ro'yxatdan o'tish
                </button>
                <p style={{ color: "#64748b", textAlign: "center", marginTop: "14px" }}>
                  Akkaunt bormi?{" "}
                  <span
                    onClick={() => setModal("login")}
                    style={{ color: "#0f766e", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Kirish
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const inputBaseStyle = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #dbe4ee",
  outline: "none",
  fontSize: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #dbe4ee",
  outline: "none",
  fontSize: "15px",
  marginBottom: "14px",
  boxSizing: "border-box",
};

const submitButtonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #14b8a6, #0f766e)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "6px",
};

export default App;
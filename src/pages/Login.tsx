import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // สำหรับใช้วิดีโอหรือภาพจาก URL สาธารณะ (ไม่ใช่ Google Drive)
    const BACKGROUND_MEDIA_URL = ""; // ใส่ URL ของวิดีโอหรือภาพที่นี่
    const USE_VIDEO = false; // เปลี่ยนเป็น true ถ้าใช้วิดีโอ

    const handleLogin = async () => {
        if (!email || !password) {
            setError("กรุณากรอกชื่อและรหัสผ่านค่ะ 💕");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // ตรวจสอบ login (email ได้ 2 แบบ: "Sai" หรือ "ทราย", รหัสเดียว: "26062568")
            if ((email === "sai" || email === "ทราย") && password === "26062568") {
                alert("เข้าไปในใจแม็คสำเร็จ ❤️");
                // Navigate ไปหน้าแรก
                window.location.href = "/";
            } else {
                alert("จำไม่ได้หรอ ใจร้ายจัง TvT");
                setError("ชื่อหรือรหัสผ่านไม่ถูกต้องค่ะ 💔");
            }
            
        } catch {
            setError("เกิดข้อผิดพลาดค่ะ");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = '#ff69b4';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 105, 180, 0.1)';
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = 'rgba(255, 105, 180, 0.3)';
        e.currentTarget.style.boxShadow = 'none';
    };

    const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 105, 180, 0.4)';
        }
    };

    const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 105, 180, 0.3)';
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            overflow: 'hidden',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            {/* Animated Gradient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #ffecd2, #fcb69f, #ff9a9e)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite'
            }} />

            {/* Optional: Background Media (ถ้ามี URL) */}
            {BACKGROUND_MEDIA_URL && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1
                }}>
                    {USE_VIDEO ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.4
                            }}
                        >
                            <source src={BACKGROUND_MEDIA_URL} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={BACKGROUND_MEDIA_URL}
                            alt="background"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.4
                            }}
                        />
                    )}
                </div>
            )}

            {/* Floating Hearts */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            opacity: 0.2 + Math.random() * 0.3,
                            animation: `floatUp ${10 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`,
                            color: '#ff69b4'
                        }}
                    >
                        ❤
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    padding: '40px',
                    borderRadius: '30px',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(255, 105, 180, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)',
                    border: '3px solid rgba(255, 192, 203, 0.5)'
                }}>
                    {/* Heart Logo */}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #ff9a9e, #ff6b9d)',
                        borderRadius: '50%',
                        boxShadow: '0 10px 30px rgba(255, 105, 180, 0.4)',
                        fontSize: '50px',
                        animation: 'heartbeat 1.5s ease-in-out infinite'
                    }}>
                        💕
                    </div>

                    {/* Title */}
                    <h1 style={{
                        background: 'linear-gradient(135deg, #ff6b9d, #c94b4b)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '2.2rem',
                        fontWeight: '800',
                        marginBottom: '10px',
                        letterSpacing: '1px'
                    }}>
                        Welcome Back
                    </h1>

                    <p style={{
                        color: '#ff69b4',
                        fontSize: '0.95rem',
                        marginBottom: '30px',
                        fontWeight: '500'
                    }}>
                        Login to your couple account ❤️
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            background: 'rgba(255, 77, 79, 0.1)',
                            border: '1px solid #ff4d4f',
                            borderRadius: '12px',
                            padding: '10px',
                            marginBottom: '20px',
                            color: '#ff4d4f',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Email Input */}
                    <div style={{ marginBottom: '16px' }}>
                        <input
                            type="text"
                            placeholder="💌 คนที่น่ารักที่สุด (ชื่อเล่น)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            style={{
                                width: '100%',
                                padding: '15px 20px',
                                borderRadius: '15px',
                                border: '2px solid rgba(255, 105, 180, 0.3)',
                                backgroundColor: 'rgba(255, 240, 245, 0.8)',
                                color: '#333',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Password Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="password"
                            placeholder="🔒 วัน/เดือน/ปี ครบรอบ"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            style={{
                                width: '100%',
                                padding: '15px 20px',
                                borderRadius: '15px',
                                border: '2px solid rgba(255, 105, 180, 0.3)',
                                backgroundColor: 'rgba(255, 240, 245, 0.8)',
                                color: '#333',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '15px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #ff6b9d, #c94b4b)',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 5px 15px rgba(255, 105, 180, 0.3)',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? '💖 กำลังเข้าสู่ระบบ...' : '💗 Login'}
                    </button>

                    {/* Footer Text */}
                    <p style={{
                        marginTop: '25px',
                        fontSize: '0.85rem',
                        color: '#999',
                        fontStyle: 'italic'
                    }}>
                        Made with love 💕
                    </p>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    10%, 30% { transform: scale(1.1); }
                    20%, 40% { transform: scale(1); }
                }

                @keyframes floatUp {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.5;
                    }
                    90% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
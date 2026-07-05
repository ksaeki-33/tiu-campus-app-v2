import React, { useState } from 'react';
import { dictionary } from './i18n.js';
import { newsItems, scheduleItems, student } from './mockData.js';

const credentials = {
  studentId: 'TIU001',
  password: '0001',
};

const tabs = [
  { key: 'home', icon: HomeIcon },
  { key: 'news', icon: NewsIcon },
  { key: 'schedule', icon: CalendarIcon },
  { key: 'id', icon: IdCardIcon },
  { key: 'settings', icon: SettingsIcon },
];

function App() {
  const [language, setLanguage] = useState('ja');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [form, setForm] = useState({ studentId: '', password: '' });
  const [error, setError] = useState('');
  const t = dictionary[language];

  const studentYear = language === 'ja' ? student.yearJa : student.yearEn;

  function handleSubmit(event) {
    event.preventDefault();
    if (form.studentId === credentials.studentId && form.password === credentials.password) {
      setIsAuthenticated(true);
      setActiveTab('home');
      setError('');
      return;
    }
    setError(t.invalidLogin);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setForm({ studentId: '', password: '' });
    setActiveTab('home');
    setError('');
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        error={error}
        form={form}
        language={language}
        setForm={setForm}
        setLanguage={setLanguage}
        t={t}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="app-shell">
      <main className="phone-frame" aria-live="polite">
        <Header activeTab={activeTab} language={language} t={t} />
        <section className="screen-content">
          {activeTab === 'home' && <HomeScreen language={language} studentYear={studentYear} t={t} />}
          {activeTab === 'news' && <NewsScreen language={language} t={t} />}
          {activeTab === 'schedule' && <ScheduleScreen language={language} t={t} />}
          {activeTab === 'id' && <StudentIdScreen studentYear={studentYear} t={t} />}
          {activeTab === 'settings' && (
            <SettingsScreen
              language={language}
              setLanguage={setLanguage}
              t={t}
              onLogout={handleLogout}
            />
          )}
        </section>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
      </main>
    </div>
  );
}

function LoginScreen({ error, form, language, setForm, setLanguage, t, onSubmit }) {
  return (
    <main className="login-layout">
      <section className="login-panel">
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <div className="brand-lockup">
          <img src="/icons/tiu-icon.svg" alt="" className="brand-mark" />
          <div>
            <p>{t.university}</p>
            <h1>{t.appName}</h1>
          </div>
        </div>
        <div className="login-copy">
          <h2>{t.loginTitle}</h2>
          <p>{t.loginLead}</p>
        </div>
        <form className="login-form" onSubmit={onSubmit}>
          <label>
            <span>{t.studentId}</span>
            <input
              autoComplete="username"
              inputMode="text"
              placeholder="TIU001"
              value={form.studentId}
              onChange={(event) => setForm({ ...form, studentId: event.target.value })}
            />
          </label>
          <label>
            <span>{t.password}</span>
            <input
              autoComplete="current-password"
              placeholder="0001"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" type="submit">
            <ShieldCheckIcon size={20} aria-hidden="true" />
            {t.login}
          </button>
        </form>
      </section>
    </main>
  );
}

function Header({ activeTab, language, t }) {
  const title = activeTab === 'id' ? t.id : t[activeTab];
  return (
    <header className="app-header">
      <div>
        <p>{t.university}</p>
        <h1>{title}</h1>
      </div>
      <span className="locale-pill">{language.toUpperCase()}</span>
    </header>
  );
}

function HomeScreen({ language, studentYear, t }) {
  const firstClass = scheduleItems[0];
  const latestNews = newsItems[0];
  return (
    <div className="stack">
      <section className="hero-card">
        <div>
          <p>{t.welcome}</p>
          <h2>{student.name}</h2>
          <dl>
            <div>
              <dt>{t.studentId}</dt>
              <dd>{student.studentId}</dd>
            </div>
            <div>
              <dt>{t.department}</dt>
              <dd>{student.department}</dd>
            </div>
            <div>
              <dt>{t.year}</dt>
              <dd>{studentYear}</dd>
            </div>
          </dl>
        </div>
        <SchoolIcon size={48} aria-hidden="true" />
      </section>

      <section className="status-grid">
        <InfoTile label={t.campusStatus} value={t.open} icon={ShieldCheckIcon} />
        <InfoTile label={t.library} value="08:30 - 20:00" icon={BellIcon} />
      </section>

      <SectionHeader title={t.todayClasses} action={t.viewAll} />
      <CompactScheduleItem item={firstClass} language={language} />

      <SectionHeader title={t.latestNews} action={t.viewAll} />
      <NewsCard item={latestNews} language={language} />
    </div>
  );
}

function NewsScreen({ language, t }) {
  return (
    <div className="stack">
      <ScreenNote text={t.noBackend} />
      {newsItems.map((item) => (
        <NewsCard key={item.id} item={item} language={language} />
      ))}
    </div>
  );
}

function ScheduleScreen({ language, t }) {
  return (
    <div className="stack">
      <ScreenNote text={t.noBackend} />
      {scheduleItems.map((item) => (
        <CompactScheduleItem key={item.id} item={item} language={language} />
      ))}
    </div>
  );
}

function StudentIdScreen({ studentYear, t }) {
  return (
    <div className="student-id-screen">
      <section className="student-card">
        <div className="student-card-top">
          <img src="/icons/tiu-icon.svg" alt="" />
          <div>
            <p>{t.university}</p>
            <h2>{t.studentCard}</h2>
          </div>
        </div>
        <div className="student-photo">
          <UserIcon size={72} aria-hidden="true" />
        </div>
        <dl>
          <div>
            <dt>{t.studentId}</dt>
            <dd>{student.studentId}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{student.name}</dd>
          </div>
          <div>
            <dt>{t.department}</dt>
            <dd>{student.department}</dd>
          </div>
          <div>
            <dt>{t.year}</dt>
            <dd>{studentYear}</dd>
          </div>
        </dl>
        <div className="verified-row">
          <ShieldCheckIcon size={18} aria-hidden="true" />
          {t.valid}
        </div>
      </section>
    </div>
  );
}

function SettingsScreen({ language, setLanguage, t, onLogout }) {
  return (
    <div className="stack">
      <section className="settings-section">
        <h2>{t.language}</h2>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </section>
      <section className="settings-section">
        <h2>{t.appInfo}</h2>
        <SettingRow label={t.pwaReady} value="manifest / sw" />
        <SettingRow label={t.version} value="0.1.0" />
      </section>
      <button className="secondary-button" type="button" onClick={onLogout}>
        <LogOutIcon size={20} aria-hidden="true" />
        {t.logout}
      </button>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab, t }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map(({ key, icon: Icon }) => (
        <button
          aria-current={activeTab === key ? 'page' : undefined}
          className={activeTab === key ? 'active' : ''}
          key={key}
          type="button"
          onClick={() => setActiveTab(key)}
        >
          <Icon size={21} aria-hidden="true" />
          <span>{key === 'id' ? t.id : t[key]}</span>
        </button>
      ))}
    </nav>
  );
}

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="language-toggle" aria-label="Language">
      <LanguagesIcon size={18} aria-hidden="true" />
      <button
        className={language === 'ja' ? 'selected' : ''}
        type="button"
        onClick={() => setLanguage('ja')}
      >
        日本語
      </button>
      <button
        className={language === 'en' ? 'selected' : ''}
        type="button"
        onClick={() => setLanguage('en')}
      >
        English
      </button>
    </div>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <article className="info-tile">
      <Icon size={22} aria-hidden="true" />
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

function SectionHeader({ action, title }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button type="button">
        {action}
        <ChevronRightIcon size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

function NewsCard({ item, language }) {
  const title = language === 'ja' ? item.titleJa : item.titleEn;
  const category = language === 'ja' ? item.categoryJa : item.categoryEn;
  return (
    <article className="news-card">
      <div>
        <span>{category}</span>
        <time>{item.date}</time>
      </div>
      <h3>{title}</h3>
    </article>
  );
}

function CompactScheduleItem({ item, language }) {
  const status = language === 'ja' ? item.statusJa : item.statusEn;
  return (
    <article className="schedule-item">
      <div className="time-block">
        <span>{status}</span>
        <strong>{item.time}</strong>
      </div>
      <div>
        <h3>{item.course}</h3>
        <p>{item.room}</p>
      </div>
    </article>
  );
}

function ScreenNote({ text }) {
  return (
    <p className="screen-note">
      <BellIcon size={16} aria-hidden="true" />
      {text}
    </p>
  );
}

function SettingRow({ label, value }) {
  return (
    <div className="setting-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;

function IconBase({ children, size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </IconBase>
  );
}

function NewsIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 5h13a3 3 0 0 1 3 3v11H6a2 2 0 0 1-2-2V5Z" />
      <path d="M8 9h7" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </IconBase>
  );
}

function CalendarIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
      <path d="M13 14h3" />
      <path d="M8 18h3" />
    </IconBase>
  );
}

function IdCardIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.5" />
      <path d="M14 10h4" />
      <path d="M14 14h3" />
      <path d="M6 17c.8-1.3 1.8-2 3-2s2.2.7 3 2" />
    </IconBase>
  );
}

function SettingsIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-1.9.1 7 7 0 0 1-1.7.7 1.7 1.7 0 0 0-1.3 1.5V23H11v-.4a1.7 1.7 0 0 0-1.3-1.5 7 7 0 0 1-1.7-.7 1.7 1.7 0 0 0-1.9-.1l-.2.1-2-3.4.1-.1A1.7 1.7 0 0 0 4.6 15a7 7 0 0 1 0-2 1.7 1.7 0 0 0-.6-1.8l-.1-.2 2-3.4.2.1a1.7 1.7 0 0 0 1.9-.1 7 7 0 0 1 1.7-.7A1.7 1.7 0 0 0 11 5.4V5h2v.4a1.7 1.7 0 0 0 1.3 1.5 7 7 0 0 1 1.7.7 1.7 1.7 0 0 0 1.9.1l.2-.1 2 3.4-.1.2a1.7 1.7 0 0 0-.6 1.8 7 7 0 0 1 0 2Z" />
    </IconBase>
  );
}

function BellIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </IconBase>
  );
}

function ShieldCheckIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </IconBase>
  );
}

function SchoolIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 10 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
      <path d="M21 10v6" />
    </IconBase>
  );
}

function UserIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.2-6 8-6s6.5 2 8 6" />
    </IconBase>
  );
}

function LanguagesIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 5h8" />
      <path d="M8 5v14" />
      <path d="M5 9c1.5 3 3.5 5 7 6" />
      <path d="M12 9c-1.5 3-3.5 5-7 6" />
      <path d="M15 19l3-7 3 7" />
      <path d="M16 16h4" />
    </IconBase>
  );
}

function LogOutIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 5v14" />
    </IconBase>
  );
}

function ChevronRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

import React, { useState, useEffect } from "react";
import { initialSubjects, initialHolidays } from "./mockData";
Y
N
W
A.


const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function App() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("bench_subjects");
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem("bench_holidays");
    return saved ? JSON.parse(saved) : initialHolidays;
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    const saved = localStorage.getItem("bench_selected_subject_id");
    return saved ? saved : (initialSubjects.length > 0 ? initialSubjects[0].id : "");
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState("default");

  const [newTitle, setNewTitle] = useState("");
  const [newProfessor, setNewProfessor] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newStartDate, setNewStartDate] = useState("2026-08-03");
  const [newEndDate, setNewEndDate] = useState("2026-12-15");
  const [newThresholdType, setNewThresholdType] = useState("percentage");
  const [newThresholdValue, setNewThresholdValue] = useState(75);
  const [newSchedule, setNewSchedule] = useState({
    1: { active: false, time: "10:00" },
    2: { active: false, time: "10:00" },
    3: { active: false, time: "10:00" },
    4: { active: false, time: "10:00" },
    5: { active: false, time: "10:00" },
    6: { active: false, time: "10:00" },
    0: { active: false, time: "10:00" }
  });

  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayStart, setNewHolidayStart] = useState("");
  const [newHolidayEnd, setNewHolidayEnd] = useState("");

  const [currentCalendarYearMonth, setCurrentCalendarYearMonth] = useState("2026-08");

  useEffect(() => {
    localStorage.setItem("bench_subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("bench_holidays", JSON.stringify(holidays));
  }, [holidays]);

  useEffect(() => {
    if (selectedSubjectId) {
      localStorage.setItem("bench_selected_subject_id", selectedSubjectId);
    } else {
      localStorage.removeItem("bench_selected_subject_id");
    }
  }, [selectedSubjectId]);

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      addToast("Notifications Configured", "cyan");
    }
  };

  const addToast = (message, type = "lime") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();

  const calculateClassDates = (subject, holidayList) => {
    const dates = [];
    const start = new Date(subject.startDate);
    const end = new Date(subject.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return [];
    
    let current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      const match = subject.weeklySchedule.find(s => s.dayOfWeek === day);
      if (match) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;
        const isHoliday = holidayList.some(h => dateStr >= h.start && dateStr <= h.end);
        if (!isHoliday) {
          dates.push({
            date: dateStr,
            time: match.time,
            dayOfWeek: day
          });
        }
      }
      current.setDate(current.getDate() + 1);
    }
    return dates.sort((a, b) => a.date.localeCompare(b.date));
  };

  const getMetrics = (subject) => {
    const allDates = calculateClassDates(subject, holidays);
    const activeDates = allDates.filter(d => subject.attendanceLog[d.date] !== "canceled");
    const totalClasses = activeDates.length;

    let maxAbsences = 0;
    if (subject.thresholdType === "percentage") {
      maxAbsences = Math.floor(totalClasses * ((100 - subject.thresholdValue) / 100));
    } else {
      maxAbsences = Number(subject.thresholdValue);
    }

    const currentAbsences = activeDates.filter(d => subject.attendanceLog[d.date] === "skipped" && !subject.excusedAbsences[d.date]).length;
    const runway = maxAbsences - currentAbsences;

    const pastHeldClasses = activeDates.filter(d => d.date <= todayStr);
    const pastHeldCount = pastHeldClasses.length;

    let attendancePercentage = 100;
    if (pastHeldCount > 0) {
      const pastAbsences = pastHeldClasses.filter(d => subject.attendanceLog[d.date] === "skipped" && !subject.excusedAbsences[d.date]).length;
      attendancePercentage = Math.round(((pastHeldCount - pastAbsences) / pastHeldCount) * 100);
    }

    let status = "safe";
    if (runway < 0) {
      status = "failed";
    } else if (runway === 0) {
      status = "danger";
    } else if (runway === 1 || runway === 2) {
      status = "warning";
    }

    return {
      allDates,
      activeDates,
      totalClasses,
      maxAbsences,
      currentAbsences,
      runway,
      pastHeldCount,
      attendancePercentage,
      status
    };
  };

  const handleToggleAttendance = (subjectId, dateStr) => {
    const updated = subjects.map(sub => {
      if (sub.id !== subjectId) return sub;

      const currentStatus = sub.attendanceLog[dateStr];
      let newStatus = "";
      if (!currentStatus) {
        newStatus = "attended";
      } else if (currentStatus === "attended") {
        newStatus = "skipped";
      } else if (currentStatus === "skipped") {
        newStatus = "canceled";
      } else if (currentStatus === "canceled") {
        newStatus = "";
      }

      const newLog = { ...sub.attendanceLog };
      if (newStatus) {
        newLog[dateStr] = newStatus;
      } else {
        delete newLog[dateStr];
      }

      const newExcused = { ...sub.excusedAbsences };
      if (newStatus !== "skipped") {
        delete newExcused[dateStr];
      }

      return {
        ...sub,
        attendanceLog: newLog,
        excusedAbsences: newExcused
      };
    });

    const oldSub = subjects.find(s => s.id === subjectId);
    const newSub = updated.find(s => s.id === subjectId);
    const oldMetrics = getMetrics(oldSub);
    const newMetrics = getMetrics(newSub);

    if (newMetrics.runway < oldMetrics.runway && (newMetrics.runway === 1 || newMetrics.runway === 0 || newMetrics.runway < 0)) {
      triggerThresholdAlert(newSub, newMetrics.runway);
    }

    setSubjects(updated);
  };

  const handleToggleExcuse = (subjectId, dateStr) => {
    setSubjects(prev => prev.map(sub => {
      if (sub.id !== subjectId) return sub;
      const excused = { ...sub.excusedAbsences };
      if (excused[dateStr]) {
        delete excused[dateStr];
      } else {
        excused[dateStr] = true;
      }
      return {
        ...sub,
        excusedAbsences: excused
      };
    }));
  };

  const triggerThresholdAlert = (subject, runway) => {
    let alertMessage = "";
    let toastType = "pink";
    
    if (runway === 1) {
      alertMessage = `CRITICAL WARNING: Only 1 skipped class remaining for ${subject.title}!`;
      toastType = "yellow";
    } else if (runway === 0) {
      alertMessage = `DANGER ZONE REACHED: 0 skipped classes remaining for ${subject.title}!`;
      toastType = "pink";
    } else if (runway < 0) {
      alertMessage = `ATTENDANCE BREACHED: You have failed attendance criteria for ${subject.title}!`;
      toastType = "pink";
    }

    addToast(alertMessage, toastType);

    if (Notification.permission === "granted") {
      new Notification("BENCH Status Update", {
        body: alertMessage,
        requireInteraction: true
      });
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const weeklySchedule = [];
    Object.keys(newSchedule).forEach(day => {
      if (newSchedule[day].active) {
        weeklySchedule.push({
          dayOfWeek: Number(day),
          time: newSchedule[day].time
        });
      }
    });

    if (weeklySchedule.length === 0) {
      alert("Please select at least one schedule day!");
      return;
    }

    const newSub = {
      id: "sub-" + Date.now(),
      title: newTitle,
      professor: newProfessor || "TBD",
      room: newRoom || "TBD",
      startDate: newStartDate,
      endDate: newEndDate,
      weeklySchedule,
      thresholdType: newThresholdType,
      thresholdValue: Number(newThresholdValue),
      attendanceLog: {},
      excusedAbsences: {}
    };

    setSubjects(prev => [...prev, newSub]);
    setSelectedSubjectId(newSub.id);
    setIsAddModalOpen(false);
    addToast(`${newTitle} Added Successfully`, "lime");

    setNewTitle("");
    setNewProfessor("");
    setNewRoom("");
    setNewSchedule({
      1: { active: false, time: "10:00" },
      2: { active: false, time: "10:00" },
      3: { active: false, time: "10:00" },
      4: { active: false, time: "10:00" },
      5: { active: false, time: "10:00" },
      6: { active: false, time: "10:00" },
      0: { active: false, time: "10:00" }
    });
  };

  const handleDeleteSubject = (id, title) => {
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      setSubjects(prev => prev.filter(s => s.id !== id));
      if (selectedSubjectId === id) {
        const remaining = subjects.filter(s => s.id !== id);
        setSelectedSubjectId(remaining.length > 0 ? remaining[0].id : "");
      }
      addToast(`${title} Deleted`, "pink");
    }
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (!newHolidayName.trim() || !newHolidayStart || !newHolidayEnd) return;

    const newH = {
      id: "h-" + Date.now(),
      name: newHolidayName,
      start: newHolidayStart,
      end: newHolidayEnd
    };

    setHolidays(prev => [...prev, newH]);
    setNewHolidayName("");
    setNewHolidayStart("");
    setNewHolidayEnd("");
    addToast("Semester Break Added", "lime");
  };

  const handleDeleteHoliday = (id, name) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
    addToast(`${name} Break Removed`, "pink");
  };

  const handleExportICS = (subject) => {
    const classDates = calculateClassDates(subject, holidays);
    let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//BENCH//Attendance Runway//EN\r\n";
    
    classDates.forEach(cd => {
      if (subject.attendanceLog[cd.date] === "canceled") return;
      const dateClean = cd.date.replace(/-/g, "");
      const timeClean = cd.time.replace(/:/g, "") + "00";
      const dtstart = `${dateClean}T${timeClean}`;

      const [hours, minutes] = cd.time.split(":").map(Number);
      let endHours = hours + 1;
      let endMinutes = minutes;
      if (endHours >= 24) endHours = 23;
      const endHoursStr = String(endHours).padStart(2, "0");
      const endMinutesStr = String(endMinutes).padStart(2, "0");
      const dtend = `${dateClean}T${endHoursStr}${endMinutesStr}00`;

      icsContent += "BEGIN:VEVENT\r\n";
      icsContent += `UID:${subject.id}-${cd.date}@bench.app\r\n`;
      icsContent += `DTSTAMP:${dateClean}T000000Z\r\n`;
      icsContent += `DTSTART:${dtstart}\r\n`;
      icsContent += `DTEND:${dtend}\r\n`;
      icsContent += `SUMMARY:${subject.title} Lecture\r\n`;
      icsContent += `LOCATION:${subject.room}\r\n`;
      icsContent += `DESCRIPTION:Lecture with ${subject.professor}\r\n`;
      icsContent += "END:VEVENT\r\n";
    });

    icsContent += "END:VCALENDAR\r\n";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${subject.title.toLowerCase().replace(/\s+/g, "_")}_schedule.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Calendar File Exported", "cyan");
  };

  const getCalendarMonths = (subject) => {
    if (!subject) return [];
    const start = new Date(subject.startDate);
    const end = new Date(subject.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return [];

    const months = [];
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(end.getFullYear(), end.getMonth(), 1);

    while (current <= last) {
      months.push({
        year: current.getFullYear(),
        month: current.getMonth()
      });
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  const generateDaysInMonthGrid = (year, month, subject, allClassDates) => {
    const grid = [];
    const firstDay = new Date(year, month, 1);
    const startPadding = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startPadding; i++) {
      grid.push({ type: "empty", key: `pad-${i}` });
    }

    for (let day = 1; day <= totalDays; day++) {
      const yearStr = String(year);
      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateStr = `${yearStr}-${monthStr}-${dayStr}`;

      const classMatch = allClassDates.find(d => d.date === dateStr);
      grid.push({
        type: "day",
        dayNum: day,
        dateStr,
        classInfo: classMatch || null,
        key: `day-${day}`
      });
    }

    return grid;
  };

  const getGlobalCalendarGrid = (yearStr, monthStr) => {
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const firstDay = new Date(year, month, 1);
    const startPadding = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const grid = [];

    for (let i = 0; i < startPadding; i++) {
      grid.push({ type: "empty", key: `pad-${i}` });
    }

    for (let day = 1; day <= totalDays; day++) {
      const y = String(year);
      const m = String(month + 1).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;

      const classesScheduled = [];
      subjects.forEach(sub => {
        const dates = calculateClassDates(sub, holidays);
        const match = dates.find(dt => dt.date === dateStr);
        if (match) {
          classesScheduled.push({
            subject: sub,
            classInfo: match,
            status: sub.attendanceLog[dateStr] || "unlogged",
            excused: sub.excusedAbsences[dateStr] || false
          });
        }
      });

      grid.push({
        type: "day",
        dayNum: day,
        dateStr,
        classes: classesScheduled,
        key: `day-${day}`
      });
    }

    return grid;
  };

  const getGlobalAbsencesForDate = (dateStr) => {
    let count = 0;
    subjects.forEach(sub => {
      const isAbsent = sub.attendanceLog[dateStr] === "skipped" && !sub.excusedAbsences[dateStr];
      if (isAbsent) count++;
    });
    return count;
  };

  const getGlobalRunwayStatus = () => {
    let totalRunway = 0;
    let failedAny = false;
    let dangerAny = false;

    subjects.forEach(sub => {
      const m = getMetrics(sub);
      totalRunway += m.runway;
      if (m.status === "failed") failedAny = true;
      if (m.status === "danger") dangerAny = true;
    });

    if (failedAny) return { text: "Breached Alert", class: "status-failed" };
    if (dangerAny) return { text: "Critical Alert", class: "status-danger" };
    if (totalRunway <= 2) return { text: "Caution Alert", class: "status-warning" };
    return { text: "Runway Safe", class: "status-safe" };
  };

  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || null;
  const activeMetrics = activeSubject ? getMetrics(activeSubject) : null;

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <div className="logo-box">BENCH</div>
          <div className="tagline">"Track your seat time."</div>
        </div>

        <div className="dashboard-actions">
          {notificationPermission !== "granted" && (
            <button className="neo-btn neo-btn-cyan" onClick={requestNotificationPermission}>
              <BellIcon /> Enable Notifications
            </button>
          )}
          <button className="neo-btn neo-btn-lime" onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon /> New Subject
          </button>
        </div>
      </header>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          className={`neo-btn ${activeTab === "dashboard" ? "neo-btn-yellow" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard View
        </button>
        <button
          className={`neo-btn ${activeTab === "global" ? "neo-btn-yellow" : ""}`}
          onClick={() => setActiveTab("global")}
        >
          Global Timeline
        </button>
      </div>

      {activeTab === "dashboard" ? (
        <>
          {subjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No Subjects Added Yet</div>
              <p className="empty-state-text">Start tracking your attendance runways by setting up your first university course.</p>
              <button className="neo-btn neo-btn-lime" onClick={() => setIsAddModalOpen(true)}>
                <PlusIcon /> Setup Course
              </button>
            </div>
          ) : (
            <>
              <div className="grid-dashboard">
                {subjects.map(sub => {
                  const m = getMetrics(sub);
                  return (
                    <div
                      key={sub.id}
                      className={`subject-card ${selectedSubjectId === sub.id ? "active-card" : ""}`}
                      onClick={() => setSelectedSubjectId(sub.id)}
                    >
                      <div className="card-header">
                        <div className="subject-title">{sub.title}</div>
                        <span className={`badge-status ${
                          m.status === "failed" ? "status-failed" :
                          m.status === "danger" ? "status-danger" :
                          m.status === "warning" ? "status-warning" : "status-safe"
                        }`}>
                          {m.status === "failed" ? "Failed" :
                           m.status === "danger" ? "Danger" :
                           m.status === "warning" ? "Warning" : "Safe"}
                        </span>
                      </div>

                      <div className="professor-info">{sub.professor}</div>
                      <div className="room-info">Room {sub.room}</div>

                      <div className="runway-number-display">
                        <span className="runway-count">
                          {m.runway < 0 ? `${Math.abs(m.runway)} OVER LIMIT` : `${m.runway} LEFT`}
                        </span>
                        <span className="runway-label">
                          {m.runway < 0 ? "Threshold Breached" : "Skips Remaining"}
                        </span>
                      </div>

                      <div className="timeline-progress-container">
                        <div className="timeline-label-row">
                          <span>Timeline ({m.attendancePercentage}%)</span>
                          <span>{m.currentAbsences} / {m.maxAbsences} Skips</span>
                        </div>
                        <div className="timeline-bar">
                          {m.allDates.map(d => {
                            const status = sub.attendanceLog[d.date];
                            const excused = sub.excusedAbsences[d.date];
                            let segmentClass = "segment-future";
                            
                            if (status === "attended") {
                              segmentClass = "segment-attended";
                            } else if (status === "skipped") {
                              segmentClass = excused ? "segment-future-skip" : "segment-skipped";
                            } else if (status === "canceled") {
                              segmentClass = "segment-canceled";
                            }

                            return (
                              <div
                                key={d.date}
                                className={`progress-segment ${segmentClass}`}
                                title={`${d.date}: ${status || "Unscheduled"}`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                        <button
                          className="neo-btn neo-btn-pink neo-btn-small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubject(sub.id, sub.title);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeSubject && activeMetrics && (
                <div className="detail-view">
                  <div className="detail-header-row">
                    <div>
                      <h2 className="detail-title">{activeSubject.title}</h2>
                      <div className="professor-info" style={{ fontSize: "1.1rem" }}>
                        Lectures: {activeSubject.professor} | Location: Room {activeSubject.room}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button className="neo-btn neo-btn-cyan" onClick={() => handleExportICS(activeSubject)}>
                        <DownloadIcon /> Export Schedule (.ics)
                      </button>
                    </div>
                  </div>

                  <div className="detail-stats-grid">
                    <div className="stat-box">
                      <span className="stat-value">{activeMetrics.totalClasses}</span>
                      <span className="stat-label">Total Lectures</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-value">{activeMetrics.pastHeldCount}</span>
                      <span className="stat-label">Lectures Held</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-value" style={{ fontFamily: "Space Mono, monospace" }}>
                        {activeMetrics.attendancePercentage}%
                      </span>
                      <span className="stat-label">Current Attendance</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-value">{activeMetrics.maxAbsences}</span>
                      <span className="stat-label">
                        Max Skips Allowed ({activeSubject.thresholdType === "percentage" ? `${activeSubject.thresholdValue}% min` : `${activeSubject.thresholdValue} total`})
                      </span>
                    </div>
                    <div className="stat-box" style={{ borderColor: activeMetrics.status === "failed" ? "var(--pink)" : "var(--black)" }}>
                      <span className="stat-value">{activeMetrics.runway}</span>
                      <span className="stat-label">Attendance Runway</span>
                    </div>
                  </div>

                  <div className="calendar-section-title">
                    <span>Dot-Matrix Month Matrix</span>
                    <div className="attendance-legend">
                      <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: "var(--lime)" }} />
                        <span>Attended</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: "var(--pink)" }} />
                        <span>Skipped</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: "var(--pink)", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)" }} />
                        <span>Excused</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: "var(--gray)" }} />
                        <span>Canceled</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: "var(--white)", borderStyle: "dashed" }} />
                        <span>Future Class</span>
                      </div>
                    </div>
                  </div>

                  <div className="dot-matrix-calendar-wrapper">
                    <div className="calendar-month-grid">
                      {getCalendarMonths(activeSubject).map(({ year, month }) => {
                        const monthLabel = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
                        const gridDays = generateDaysInMonthGrid(year, month, activeSubject, activeMetrics.allDates);

                        return (
                          <div key={`${year}-${month}`} className="month-block">
                            <div className="month-title">{monthLabel}</div>
                            <div className="days-of-week-header">
                              <span className="day-header">Su</span>
                              <span className="day-header">Mo</span>
                              <span className="day-header">Tu</span>
                              <span className="day-header">We</span>
                              <span className="day-header">Th</span>
                              <span className="day-header">Fr</span>
                              <span className="day-header">Sa</span>
                            </div>
                            <div className="month-days-grid">
                              {gridDays.map((cell, idx) => {
                                if (cell.type === "empty") {
                                  return <div key={`empty-${idx}`} className="calendar-day-cell inactive-day" />;
                                }

                                const isClass = cell.classInfo !== null;
                                let cellClass = "";
                                let tooltipText = `${cell.dateStr}: No Lecture Scheduled`;

                                if (isClass) {
                                  const status = activeSubject.attendanceLog[cell.dateStr];
                                  const excused = activeSubject.excusedAbsences[cell.dateStr];
                                  const inFuture = cell.dateStr > todayStr;

                                  if (status === "attended") {
                                    cellClass = "cell-attended";
                                    tooltipText = `${cell.dateStr} [${cell.classInfo.time}]: Attended`;
                                  } else if (status === "skipped") {
                                    cellClass = excused ? "cell-excused" : "cell-skipped";
                                    tooltipText = `${cell.dateStr} [${cell.classInfo.time}]: Skipped${excused ? " (Excused)" : ""}`;
                                  } else if (status === "canceled") {
                                    cellClass = "cell-canceled";
                                    tooltipText = `${cell.dateStr} [${cell.classInfo.time}]: Lecture Canceled`;
                                  } else if (inFuture) {
                                    cellClass = "cell-future";
                                    tooltipText = `${cell.dateStr} [${cell.classInfo.time}]: Future Scheduled`;
                                  } else {
                                    cellClass = "cell-future";
                                    tooltipText = `${cell.dateStr} [${cell.classInfo.time}]: Unlogged`;
                                  }
                                }

                                return (
                                  <div
                                    key={cell.key}
                                    className={`calendar-day-cell ${isClass ? "class-day" : ""} ${cellClass}`}
                                    onClick={() => isClass && handleToggleAttendance(activeSubject.id, cell.dateStr)}
                                  >
                                    {cell.dayNum}
                                    <div className="tooltip-container">{tooltipText}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="detail-actions-log">
                    <h3 className="form-label" style={{ marginBottom: "1rem" }}>Logged Absences & Excuses</h3>
                    <div className="attendance-log-list">
                      {activeMetrics.allDates.filter(d => activeSubject.attendanceLog[d.date] === "skipped").length === 0 ? (
                        <div style={{ padding: "1.5rem", textAlign: "center", border: "2px dashed var(--black)", color: "var(--dark-gray)" }}>
                          No absences logged for this subject yet. Nice attendance runway!
                        </div>
                      ) : (
                        activeMetrics.allDates
                          .filter(d => activeSubject.attendanceLog[d.date] === "skipped")
                          .map(d => {
                            const isExcused = activeSubject.excusedAbsences[d.date] || false;
                            return (
                              <div key={d.date} className="log-item-row">
                                <div className="log-item-left">
                                  <span className="log-item-date">{d.date}</span>
                                  <span>Time: {d.time}</span>
                                  {isExcused && <span className="excuse-badge">Excused</span>}
                                </div>
                                <div className="log-item-right">
                                  <button
                                    className={`neo-btn neo-btn-small ${isExcused ? "excuse-btn-active" : "neo-btn-cyan"}`}
                                    onClick={() => handleToggleExcuse(activeSubject.id, d.date)}
                                  >
                                    {isExcused ? "Absence Excused" : "Excuse Absence"}
                                  </button>
                                </div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="detail-view">
          <div className="detail-header-row">
            <div>
              <h2 className="detail-title">Global Timetable & Attendance Log</h2>
              <div className="professor-info" style={{ fontSize: "1.1rem" }}>
                Consolidated grid of all enrolled subjects. View skipped totals per day.
              </div>
            </div>
            <div>
              <span className={`badge-status ${getGlobalRunwayStatus().class}`} style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
                {getGlobalRunwayStatus().text}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
            <span className="form-label" style={{ margin: 0 }}>View Month:</span>
            <input
              type="month"
              className="form-input"
              style={{ maxWidth: "200px" }}
              value={currentCalendarYearMonth}
              onChange={(e) => setCurrentCalendarYearMonth(e.target.value)}
            />
          </div>

          <div className="dot-matrix-calendar-wrapper">
            <div className="month-block" style={{ maxWidth: "100%", boxShadow: "none" }}>
              <div className="month-title">
                {new Date(currentCalendarYearMonth + "-02").toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
              <div className="days-of-week-header">
                <span className="day-header">Su</span>
                <span className="day-header">Mo</span>
                <span className="day-header">Tu</span>
                <span className="day-header">We</span>
                <span className="day-header">Th</span>
                <span className="day-header">Fr</span>
                <span className="day-header">Sa</span>
              </div>
              <div className="month-days-grid">
                {getGlobalCalendarGrid(currentCalendarYearMonth.split("-")[0], currentCalendarYearMonth.split("-")[1]).map((cell, idx) => {
                  if (cell.type === "empty") {
                    return <div key={`global-empty-${idx}`} className="calendar-day-cell inactive-day" />;
                  }

                  const hasClasses = cell.classes.length > 0;
                  const totalAbsences = getGlobalAbsencesForDate(cell.dateStr);
                  
                  let cellStyle = {};
                  let cellClass = "";
                  
                  if (hasClasses) {
                    cellClass = "class-day";
                    if (totalAbsences > 0) {
                      cellStyle = { backgroundColor: "var(--pink)", border: "3px solid var(--black)" };
                    } else {
                      const allAttended = cell.classes.every(c => c.status === "attended");
                      if (allAttended) {
                        cellStyle = { backgroundColor: "var(--lime)" };
                      }
                    }
                  }

                  let tooltipText = `${cell.dateStr}: `;
                  if (hasClasses) {
                    tooltipText += cell.classes.map(c => `${c.subject.title} (${c.status})`).join(", ");
                  } else {
                    tooltipText += "No classes scheduled";
                  }

                  return (
                    <div
                      key={cell.key}
                      className={`calendar-day-cell ${cellClass}`}
                      style={cellStyle}
                    >
                      <span style={{ fontWeight: "bold" }}>{cell.dayNum}</span>
                      
                      {totalAbsences > 0 && (
                        <span style={{
                          position: "absolute",
                          bottom: "2px",
                          right: "2px",
                          backgroundColor: "var(--black)",
                          color: "var(--pink)",
                          fontSize: "0.6rem",
                          padding: "1px 3px",
                          fontWeight: "bold"
                        }}>
                          {totalAbsences} skips
                        </span>
                      )}

                      {hasClasses && totalAbsences === 0 && (
                        <div style={{ display: "flex", gap: "2px", position: "absolute", bottom: "4px" }}>
                          {cell.classes.map((c, i) => (
                            <span
                              key={i}
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: c.status === "attended" ? "var(--lime)" :
                                                 c.status === "canceled" ? "var(--gray)" : "var(--white)"
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <div className="tooltip-container">{tooltipText}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="attendance-legend" style={{ marginBottom: "2rem" }}>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: "var(--pink)" }} />
              <span>Skipped Class Day (1 or more absences)</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: "var(--lime)" }} />
              <span>Fully Attended Class Day</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: "var(--white)" }} />
              <span>Future/Unlogged Scheduled Class</span>
            </div>
          </div>
        </div>
      )}

      <div className="holidays-list-container">
        <h3 className="modal-title" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Global Breaks & Holidays</h3>
        <p style={{ color: "var(--dark-gray)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          Absences will not be calculated for dates within semester breaks.
        </p>

        <form onSubmit={handleAddHoliday} className="form-row-2" style={{ marginBottom: "1.5rem", alignItems: "flex-end" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Break Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Fall Recess"
              value={newHolidayName}
              onChange={(e) => setNewHolidayName(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-input"
                value={newHolidayStart}
                onChange={(e) => setNewHolidayStart(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-input"
                value={newHolidayEnd}
                onChange={(e) => setNewHolidayEnd(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="neo-btn neo-btn-lime" style={{ height: "45px", display: "flex", justifyContent: "center" }}>
              Add Break
            </button>
          </div>
        </form>

        <div>
          {holidays.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", border: "2px dashed var(--black)", color: "var(--dark-gray)" }}>
              No holiday or break dates registered.
            </div>
          ) : (
            holidays.map(h => (
              <div key={h.id} className="holiday-item">
                <span>{h.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span>{h.start} to {h.end}</span>
                  <button
                    className="neo-btn neo-btn-pink neo-btn-small"
                    onClick={() => handleDeleteHoliday(h.id, h.name)}
                    style={{ padding: "0.2rem 0.5rem", borderSize: "1px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-title">Create Course Profile</span>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Operating Systems"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Professor Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Dr. Cooper"
                      value={newProfessor}
                      onChange={(e) => setNewProfessor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Room Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Tech 302"
                      value={newRoom}
                      onChange={(e) => setNewRoom(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Semester Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Semester End Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Policy Selection</label>
                    <select
                      className="form-input"
                      value={newThresholdType}
                      onChange={(e) => {
                        setNewThresholdType(e.target.value);
                        setNewThresholdValue(e.target.value === "percentage" ? 75 : 4);
                      }}
                    >
                      <option value="percentage">Attendance Percentage Minimum</option>
                      <option value="count">Hard Absence Count Maximum</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {newThresholdType === "percentage" ? "Minimum Required (%)" : "Maximum Skip Limit"}
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      min="1"
                      max={newThresholdType === "percentage" ? "100" : "100"}
                      value={newThresholdValue}
                      onChange={(e) => setNewThresholdValue(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <label className="form-label">Weekly Schedule (Frequency)</label>
                <div className="schedule-selectors">
                  {[
                    { dayNum: 1, label: "Monday" },
                    { dayNum: 2, label: "Tuesday" },
                    { dayNum: 3, label: "Wednesday" },
                    { dayNum: 4, label: "Thursday" },
                    { dayNum: 5, label: "Friday" },
                    { dayNum: 6, label: "Saturday" },
                    { dayNum: 0, label: "Sunday" }
                  ].map(({ dayNum, label }) => (
                    <div key={dayNum} className="day-schedule-row">
                      <input
                        type="checkbox"
                        id={`chk-${dayNum}`}
                        checked={newSchedule[dayNum].active}
                        onChange={(e) => setNewSchedule(prev => ({
                          ...prev,
                          [dayNum]: { ...prev[dayNum], active: e.target.checked }
                        }))}
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                      />
                      <label htmlFor={`chk-${dayNum}`}>{label}</label>
                      {newSchedule[dayNum].active && (
                        <input
                          type="time"
                          className="form-input"
                          style={{ maxWidth: "120px", padding: "0.2rem 0.5rem" }}
                          value={newSchedule[dayNum].time}
                          onChange={(e) => setNewSchedule(prev => ({
                            ...prev,
                            [dayNum]: { ...prev[dayNum], time: e.target.value }
                          }))}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="neo-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="neo-btn neo-btn-lime">Add Course Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 999 }}>
        {toasts.map(toast => (
          <div key={toast.id} className={`alert-toast ${toast.type === "yellow" ? "toast-yellow" : toast.type === "lime" ? "toast-lime" : ""}`}>
            <AlertIcon />
            <span>{toast.message}</span>
            <button className="alert-toast-close" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

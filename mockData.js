export const initialSubjects = [
  {
    id: "sub-1",
    title: "Operating Systems",
    professor: "JURGEN KLOPP",
    room: "ANFIELD 2",
    startDate: "2026-08-03",
    endDate: "2026-12-15",
    weeklySchedule: [
      { dayOfWeek: 1, time: "10:00" },
      { dayOfWeek: 3, time: "14:00" }
    ],
    thresholdType: "percentage",
    thresholdValue: 75,
    attendanceLog: {
      "2026-08-03": "attended",
      "2026-08-05": "skipped",
      "2026-08-10": "attended",
      "2026-08-12": "attended",
      "2026-08-17": "skipped",
      "2026-08-19": "attended",
      "2026-08-24": "attended"
    },
    excusedAbsences: {}
  },
  {
    id: "sub-2",
    title: "LIVERPOOL 101",
    professor: "CODY GAKPO",
    room: "Engineering Annex 105",
    startDate: "2026-08-03",
    endDate: "2026-12-15",
    weeklySchedule: [
      { dayOfWeek: 2, time: "11:30" },
      { dayOfWeek: 4, time: "13:00" }
    ],
    thresholdType: "count",
    thresholdValue: 4,
    attendanceLog: {
      "2026-08-04": "attended",
      "2026-08-06": "attended",
      "2026-08-11": "attended",
      "2026-08-13": "attended",
      "2026-08-18": "attended",
      "2026-08-20": "skipped",
      "2026-08-25": "attended"
    },
    excusedAbsences: {}
  },
  {
    id: "sub-3",
    title: "Design Systems",
    professor: "STEVEN G",
    room: "Studio B",
    startDate: "2026-08-03",
    endDate: "2026-12-15",
    weeklySchedule: [
      { dayOfWeek: 5, time: "09:00" }
    ],
    thresholdType: "percentage",
    thresholdValue: 80,
    attendanceLog: {
      "2026-08-07": "attended",
      "2026-08-14": "skipped",
      "2026-08-21": "skipped"
    },
    excusedAbsences: {
      "2026-08-14": true
    }
  }
];

export const initialHolidays = [
  {
    id: "h-1",
    name: "Fall Break",
    start: "2026-10-12",
    end: "2026-10-16"
  },
  {
    id: "h-2",
    name: "Thanksgiving Break",
    start: "2026-11-23",
    end: "2026-11-27"
  }
];

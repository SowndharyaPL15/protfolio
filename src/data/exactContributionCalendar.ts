// Exact live GitHub Contribution Calendar for @SowndharyaPL15
// Extracted with 1:1 coordinate accuracy from GitHub's official calendar table

export interface ContributionCell {
  date:    string;
  row:     number; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  col:     number; // 0 to 52 (53 weeks)
  level:   number; // 0 to 4
  tooltip: string; // e.g. "6 contributions on March 3rd."
}

export interface MonthLabel {
  month:   string;
  colspan: number;
}

export const GITHUB_MONTH_LABELS: MonthLabel[] = [
  {
    "month": "Sep",
    "colspan": 4
  },
  {
    "month": "Oct",
    "colspan": 4
  },
  {
    "month": "Nov",
    "colspan": 5
  },
  {
    "month": "Dec",
    "colspan": 4
  },
  {
    "month": "Jan",
    "colspan": 4
  },
  {
    "month": "Feb",
    "colspan": 4
  },
  {
    "month": "Mar",
    "colspan": 5
  },
  {
    "month": "Apr",
    "colspan": 4
  },
  {
    "month": "May",
    "colspan": 5
  },
  {
    "month": "Jun",
    "colspan": 4
  },
  {
    "month": "Jul",
    "colspan": 4
  },
  {
    "month": "Aug",
    "colspan": 5
  }
];

export const GITHUB_WEEK_COLUMNS: (ContributionCell | null)[][] = [
  [
    {
      "date": "2025-09-07",
      "row": 0,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 7th."
    },
    {
      "date": "2025-09-08",
      "row": 1,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 8th."
    },
    {
      "date": "2025-09-09",
      "row": 2,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 9th."
    },
    {
      "date": "2025-09-10",
      "row": 3,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 10th."
    },
    {
      "date": "2025-09-11",
      "row": 4,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 11th."
    },
    {
      "date": "2025-09-12",
      "row": 5,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 12th."
    },
    {
      "date": "2025-09-13",
      "row": 6,
      "col": 0,
      "level": 0,
      "tooltip": "No contributions on September 13th."
    }
  ],
  [
    {
      "date": "2025-09-14",
      "row": 0,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 14th."
    },
    {
      "date": "2025-09-15",
      "row": 1,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 15th."
    },
    {
      "date": "2025-09-16",
      "row": 2,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 16th."
    },
    {
      "date": "2025-09-17",
      "row": 3,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 17th."
    },
    {
      "date": "2025-09-18",
      "row": 4,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 18th."
    },
    {
      "date": "2025-09-19",
      "row": 5,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 19th."
    },
    {
      "date": "2025-09-20",
      "row": 6,
      "col": 1,
      "level": 0,
      "tooltip": "No contributions on September 20th."
    }
  ],
  [
    {
      "date": "2025-09-21",
      "row": 0,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 21st."
    },
    {
      "date": "2025-09-22",
      "row": 1,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 22nd."
    },
    {
      "date": "2025-09-23",
      "row": 2,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 23rd."
    },
    {
      "date": "2025-09-24",
      "row": 3,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 24th."
    },
    {
      "date": "2025-09-25",
      "row": 4,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 25th."
    },
    {
      "date": "2025-09-26",
      "row": 5,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 26th."
    },
    {
      "date": "2025-09-27",
      "row": 6,
      "col": 2,
      "level": 0,
      "tooltip": "No contributions on September 27th."
    }
  ],
  [
    {
      "date": "2025-09-28",
      "row": 0,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on September 28th."
    },
    {
      "date": "2025-09-29",
      "row": 1,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on September 29th."
    },
    {
      "date": "2025-09-30",
      "row": 2,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on September 30th."
    },
    {
      "date": "2025-10-01",
      "row": 3,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on October 1st."
    },
    {
      "date": "2025-10-02",
      "row": 4,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on October 2nd."
    },
    {
      "date": "2025-10-03",
      "row": 5,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on October 3rd."
    },
    {
      "date": "2025-10-04",
      "row": 6,
      "col": 3,
      "level": 0,
      "tooltip": "No contributions on October 4th."
    }
  ],
  [
    {
      "date": "2025-10-05",
      "row": 0,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 5th."
    },
    {
      "date": "2025-10-06",
      "row": 1,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 6th."
    },
    {
      "date": "2025-10-07",
      "row": 2,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 7th."
    },
    {
      "date": "2025-10-08",
      "row": 3,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 8th."
    },
    {
      "date": "2025-10-09",
      "row": 4,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 9th."
    },
    {
      "date": "2025-10-10",
      "row": 5,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 10th."
    },
    {
      "date": "2025-10-11",
      "row": 6,
      "col": 4,
      "level": 0,
      "tooltip": "No contributions on October 11th."
    }
  ],
  [
    {
      "date": "2025-10-12",
      "row": 0,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 12th."
    },
    {
      "date": "2025-10-13",
      "row": 1,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 13th."
    },
    {
      "date": "2025-10-14",
      "row": 2,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 14th."
    },
    {
      "date": "2025-10-15",
      "row": 3,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 15th."
    },
    {
      "date": "2025-10-16",
      "row": 4,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 16th."
    },
    {
      "date": "2025-10-17",
      "row": 5,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 17th."
    },
    {
      "date": "2025-10-18",
      "row": 6,
      "col": 5,
      "level": 0,
      "tooltip": "No contributions on October 18th."
    }
  ],
  [
    {
      "date": "2025-10-19",
      "row": 0,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 19th."
    },
    {
      "date": "2025-10-20",
      "row": 1,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 20th."
    },
    {
      "date": "2025-10-21",
      "row": 2,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 21st."
    },
    {
      "date": "2025-10-22",
      "row": 3,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 22nd."
    },
    {
      "date": "2025-10-23",
      "row": 4,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 23rd."
    },
    {
      "date": "2025-10-24",
      "row": 5,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 24th."
    },
    {
      "date": "2025-10-25",
      "row": 6,
      "col": 6,
      "level": 0,
      "tooltip": "No contributions on October 25th."
    }
  ],
  [
    {
      "date": "2025-10-26",
      "row": 0,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 26th."
    },
    {
      "date": "2025-10-27",
      "row": 1,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 27th."
    },
    {
      "date": "2025-10-28",
      "row": 2,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 28th."
    },
    {
      "date": "2025-10-29",
      "row": 3,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 29th."
    },
    {
      "date": "2025-10-30",
      "row": 4,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 30th."
    },
    {
      "date": "2025-10-31",
      "row": 5,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on October 31st."
    },
    {
      "date": "2025-11-01",
      "row": 6,
      "col": 7,
      "level": 0,
      "tooltip": "No contributions on November 1st."
    }
  ],
  [
    {
      "date": "2025-11-02",
      "row": 0,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 2nd."
    },
    {
      "date": "2025-11-03",
      "row": 1,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 3rd."
    },
    {
      "date": "2025-11-04",
      "row": 2,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 4th."
    },
    {
      "date": "2025-11-05",
      "row": 3,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 5th."
    },
    {
      "date": "2025-11-06",
      "row": 4,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 6th."
    },
    {
      "date": "2025-11-07",
      "row": 5,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 7th."
    },
    {
      "date": "2025-11-08",
      "row": 6,
      "col": 8,
      "level": 0,
      "tooltip": "No contributions on November 8th."
    }
  ],
  [
    {
      "date": "2025-11-09",
      "row": 0,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 9th."
    },
    {
      "date": "2025-11-10",
      "row": 1,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 10th."
    },
    {
      "date": "2025-11-11",
      "row": 2,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 11th."
    },
    {
      "date": "2025-11-12",
      "row": 3,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 12th."
    },
    {
      "date": "2025-11-13",
      "row": 4,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 13th."
    },
    {
      "date": "2025-11-14",
      "row": 5,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 14th."
    },
    {
      "date": "2025-11-15",
      "row": 6,
      "col": 9,
      "level": 0,
      "tooltip": "No contributions on November 15th."
    }
  ],
  [
    {
      "date": "2025-11-16",
      "row": 0,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 16th."
    },
    {
      "date": "2025-11-17",
      "row": 1,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 17th."
    },
    {
      "date": "2025-11-18",
      "row": 2,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 18th."
    },
    {
      "date": "2025-11-19",
      "row": 3,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 19th."
    },
    {
      "date": "2025-11-20",
      "row": 4,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 20th."
    },
    {
      "date": "2025-11-21",
      "row": 5,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 21st."
    },
    {
      "date": "2025-11-22",
      "row": 6,
      "col": 10,
      "level": 0,
      "tooltip": "No contributions on November 22nd."
    }
  ],
  [
    {
      "date": "2025-11-23",
      "row": 0,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 23rd."
    },
    {
      "date": "2025-11-24",
      "row": 1,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 24th."
    },
    {
      "date": "2025-11-25",
      "row": 2,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 25th."
    },
    {
      "date": "2025-11-26",
      "row": 3,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 26th."
    },
    {
      "date": "2025-11-27",
      "row": 4,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 27th."
    },
    {
      "date": "2025-11-28",
      "row": 5,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 28th."
    },
    {
      "date": "2025-11-29",
      "row": 6,
      "col": 11,
      "level": 0,
      "tooltip": "No contributions on November 29th."
    }
  ],
  [
    {
      "date": "2025-11-30",
      "row": 0,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on November 30th."
    },
    {
      "date": "2025-12-01",
      "row": 1,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 1st."
    },
    {
      "date": "2025-12-02",
      "row": 2,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 2nd."
    },
    {
      "date": "2025-12-03",
      "row": 3,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 3rd."
    },
    {
      "date": "2025-12-04",
      "row": 4,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 4th."
    },
    {
      "date": "2025-12-05",
      "row": 5,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 5th."
    },
    {
      "date": "2025-12-06",
      "row": 6,
      "col": 12,
      "level": 0,
      "tooltip": "No contributions on December 6th."
    }
  ],
  [
    {
      "date": "2025-12-07",
      "row": 0,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 7th."
    },
    {
      "date": "2025-12-08",
      "row": 1,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 8th."
    },
    {
      "date": "2025-12-09",
      "row": 2,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 9th."
    },
    {
      "date": "2025-12-10",
      "row": 3,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 10th."
    },
    {
      "date": "2025-12-11",
      "row": 4,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 11th."
    },
    {
      "date": "2025-12-12",
      "row": 5,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 12th."
    },
    {
      "date": "2025-12-13",
      "row": 6,
      "col": 13,
      "level": 0,
      "tooltip": "No contributions on December 13th."
    }
  ],
  [
    {
      "date": "2025-12-14",
      "row": 0,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 14th."
    },
    {
      "date": "2025-12-15",
      "row": 1,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 15th."
    },
    {
      "date": "2025-12-16",
      "row": 2,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 16th."
    },
    {
      "date": "2025-12-17",
      "row": 3,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 17th."
    },
    {
      "date": "2025-12-18",
      "row": 4,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 18th."
    },
    {
      "date": "2025-12-19",
      "row": 5,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 19th."
    },
    {
      "date": "2025-12-20",
      "row": 6,
      "col": 14,
      "level": 0,
      "tooltip": "No contributions on December 20th."
    }
  ],
  [
    {
      "date": "2025-12-21",
      "row": 0,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 21st."
    },
    {
      "date": "2025-12-22",
      "row": 1,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 22nd."
    },
    {
      "date": "2025-12-23",
      "row": 2,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 23rd."
    },
    {
      "date": "2025-12-24",
      "row": 3,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 24th."
    },
    {
      "date": "2025-12-25",
      "row": 4,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 25th."
    },
    {
      "date": "2025-12-26",
      "row": 5,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 26th."
    },
    {
      "date": "2025-12-27",
      "row": 6,
      "col": 15,
      "level": 0,
      "tooltip": "No contributions on December 27th."
    }
  ],
  [
    {
      "date": "2025-12-28",
      "row": 0,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on December 28th."
    },
    {
      "date": "2025-12-29",
      "row": 1,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on December 29th."
    },
    {
      "date": "2025-12-30",
      "row": 2,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on December 30th."
    },
    {
      "date": "2025-12-31",
      "row": 3,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on December 31st."
    },
    {
      "date": "2026-01-01",
      "row": 4,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on January 1st."
    },
    {
      "date": "2026-01-02",
      "row": 5,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on January 2nd."
    },
    {
      "date": "2026-01-03",
      "row": 6,
      "col": 16,
      "level": 0,
      "tooltip": "No contributions on January 3rd."
    }
  ],
  [
    {
      "date": "2026-01-04",
      "row": 0,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 4th."
    },
    {
      "date": "2026-01-05",
      "row": 1,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 5th."
    },
    {
      "date": "2026-01-06",
      "row": 2,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 6th."
    },
    {
      "date": "2026-01-07",
      "row": 3,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 7th."
    },
    {
      "date": "2026-01-08",
      "row": 4,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 8th."
    },
    {
      "date": "2026-01-09",
      "row": 5,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 9th."
    },
    {
      "date": "2026-01-10",
      "row": 6,
      "col": 17,
      "level": 0,
      "tooltip": "No contributions on January 10th."
    }
  ],
  [
    {
      "date": "2026-01-11",
      "row": 0,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 11th."
    },
    {
      "date": "2026-01-12",
      "row": 1,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 12th."
    },
    {
      "date": "2026-01-13",
      "row": 2,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 13th."
    },
    {
      "date": "2026-01-14",
      "row": 3,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 14th."
    },
    {
      "date": "2026-01-15",
      "row": 4,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 15th."
    },
    {
      "date": "2026-01-16",
      "row": 5,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 16th."
    },
    {
      "date": "2026-01-17",
      "row": 6,
      "col": 18,
      "level": 0,
      "tooltip": "No contributions on January 17th."
    }
  ],
  [
    {
      "date": "2026-01-18",
      "row": 0,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 18th."
    },
    {
      "date": "2026-01-19",
      "row": 1,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 19th."
    },
    {
      "date": "2026-01-20",
      "row": 2,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 20th."
    },
    {
      "date": "2026-01-21",
      "row": 3,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 21st."
    },
    {
      "date": "2026-01-22",
      "row": 4,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 22nd."
    },
    {
      "date": "2026-01-23",
      "row": 5,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 23rd."
    },
    {
      "date": "2026-01-24",
      "row": 6,
      "col": 19,
      "level": 0,
      "tooltip": "No contributions on January 24th."
    }
  ],
  [
    {
      "date": "2026-01-25",
      "row": 0,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 25th."
    },
    {
      "date": "2026-01-26",
      "row": 1,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 26th."
    },
    {
      "date": "2026-01-27",
      "row": 2,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 27th."
    },
    {
      "date": "2026-01-28",
      "row": 3,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 28th."
    },
    {
      "date": "2026-01-29",
      "row": 4,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 29th."
    },
    {
      "date": "2026-01-30",
      "row": 5,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 30th."
    },
    {
      "date": "2026-01-31",
      "row": 6,
      "col": 20,
      "level": 0,
      "tooltip": "No contributions on January 31st."
    }
  ],
  [
    {
      "date": "2026-02-01",
      "row": 0,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 1st."
    },
    {
      "date": "2026-02-02",
      "row": 1,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 2nd."
    },
    {
      "date": "2026-02-03",
      "row": 2,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 3rd."
    },
    {
      "date": "2026-02-04",
      "row": 3,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 4th."
    },
    {
      "date": "2026-02-05",
      "row": 4,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 5th."
    },
    {
      "date": "2026-02-06",
      "row": 5,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 6th."
    },
    {
      "date": "2026-02-07",
      "row": 6,
      "col": 21,
      "level": 0,
      "tooltip": "No contributions on February 7th."
    }
  ],
  [
    {
      "date": "2026-02-08",
      "row": 0,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 8th."
    },
    {
      "date": "2026-02-09",
      "row": 1,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 9th."
    },
    {
      "date": "2026-02-10",
      "row": 2,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 10th."
    },
    {
      "date": "2026-02-11",
      "row": 3,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 11th."
    },
    {
      "date": "2026-02-12",
      "row": 4,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 12th."
    },
    {
      "date": "2026-02-13",
      "row": 5,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 13th."
    },
    {
      "date": "2026-02-14",
      "row": 6,
      "col": 22,
      "level": 0,
      "tooltip": "No contributions on February 14th."
    }
  ],
  [
    {
      "date": "2026-02-15",
      "row": 0,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 15th."
    },
    {
      "date": "2026-02-16",
      "row": 1,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 16th."
    },
    {
      "date": "2026-02-17",
      "row": 2,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 17th."
    },
    {
      "date": "2026-02-18",
      "row": 3,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 18th."
    },
    {
      "date": "2026-02-19",
      "row": 4,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 19th."
    },
    {
      "date": "2026-02-20",
      "row": 5,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 20th."
    },
    {
      "date": "2026-02-21",
      "row": 6,
      "col": 23,
      "level": 0,
      "tooltip": "No contributions on February 21st."
    }
  ],
  [
    {
      "date": "2026-02-22",
      "row": 0,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 22nd."
    },
    {
      "date": "2026-02-23",
      "row": 1,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 23rd."
    },
    {
      "date": "2026-02-24",
      "row": 2,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 24th."
    },
    {
      "date": "2026-02-25",
      "row": 3,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 25th."
    },
    {
      "date": "2026-02-26",
      "row": 4,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 26th."
    },
    {
      "date": "2026-02-27",
      "row": 5,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 27th."
    },
    {
      "date": "2026-02-28",
      "row": 6,
      "col": 24,
      "level": 0,
      "tooltip": "No contributions on February 28th."
    }
  ],
  [
    {
      "date": "2026-03-01",
      "row": 0,
      "col": 25,
      "level": 0,
      "tooltip": "No contributions on March 1st."
    },
    {
      "date": "2026-03-02",
      "row": 1,
      "col": 25,
      "level": 0,
      "tooltip": "No contributions on March 2nd."
    },
    {
      "date": "2026-03-03",
      "row": 2,
      "col": 25,
      "level": 1,
      "tooltip": "6 contributions on March 3rd."
    },
    {
      "date": "2026-03-04",
      "row": 3,
      "col": 25,
      "level": 1,
      "tooltip": "4 contributions on March 4th."
    },
    {
      "date": "2026-03-05",
      "row": 4,
      "col": 25,
      "level": 1,
      "tooltip": "6 contributions on March 5th."
    },
    {
      "date": "2026-03-06",
      "row": 5,
      "col": 25,
      "level": 1,
      "tooltip": "2 contributions on March 6th."
    },
    {
      "date": "2026-03-07",
      "row": 6,
      "col": 25,
      "level": 1,
      "tooltip": "2 contributions on March 7th."
    }
  ],
  [
    {
      "date": "2026-03-08",
      "row": 0,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 8th."
    },
    {
      "date": "2026-03-09",
      "row": 1,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 9th."
    },
    {
      "date": "2026-03-10",
      "row": 2,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 10th."
    },
    {
      "date": "2026-03-11",
      "row": 3,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 11th."
    },
    {
      "date": "2026-03-12",
      "row": 4,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 12th."
    },
    {
      "date": "2026-03-13",
      "row": 5,
      "col": 26,
      "level": 1,
      "tooltip": "8 contributions on March 13th."
    },
    {
      "date": "2026-03-14",
      "row": 6,
      "col": 26,
      "level": 1,
      "tooltip": "2 contributions on March 14th."
    }
  ],
  [
    {
      "date": "2026-03-15",
      "row": 0,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 15th."
    },
    {
      "date": "2026-03-16",
      "row": 1,
      "col": 27,
      "level": 1,
      "tooltip": "6 contributions on March 16th."
    },
    {
      "date": "2026-03-17",
      "row": 2,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 17th."
    },
    {
      "date": "2026-03-18",
      "row": 3,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 18th."
    },
    {
      "date": "2026-03-19",
      "row": 4,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 19th."
    },
    {
      "date": "2026-03-20",
      "row": 5,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 20th."
    },
    {
      "date": "2026-03-21",
      "row": 6,
      "col": 27,
      "level": 1,
      "tooltip": "2 contributions on March 21st."
    }
  ],
  [
    {
      "date": "2026-03-22",
      "row": 0,
      "col": 28,
      "level": 1,
      "tooltip": "2 contributions on March 22nd."
    },
    {
      "date": "2026-03-23",
      "row": 1,
      "col": 28,
      "level": 1,
      "tooltip": "2 contributions on March 23rd."
    },
    {
      "date": "2026-03-24",
      "row": 2,
      "col": 28,
      "level": 1,
      "tooltip": "5 contributions on March 24th."
    },
    {
      "date": "2026-03-25",
      "row": 3,
      "col": 28,
      "level": 1,
      "tooltip": "3 contributions on March 25th."
    },
    {
      "date": "2026-03-26",
      "row": 4,
      "col": 28,
      "level": 1,
      "tooltip": "4 contributions on March 26th."
    },
    {
      "date": "2026-03-27",
      "row": 5,
      "col": 28,
      "level": 1,
      "tooltip": "2 contributions on March 27th."
    },
    {
      "date": "2026-03-28",
      "row": 6,
      "col": 28,
      "level": 1,
      "tooltip": "2 contributions on March 28th."
    }
  ],
  [
    {
      "date": "2026-03-29",
      "row": 0,
      "col": 29,
      "level": 1,
      "tooltip": "2 contributions on March 29th."
    },
    {
      "date": "2026-03-30",
      "row": 1,
      "col": 29,
      "level": 1,
      "tooltip": "1 contribution on March 30th."
    },
    {
      "date": "2026-03-31",
      "row": 2,
      "col": 29,
      "level": 1,
      "tooltip": "2 contributions on March 31st."
    },
    {
      "date": "2026-04-01",
      "row": 3,
      "col": 29,
      "level": 1,
      "tooltip": "2 contributions on April 1st."
    },
    {
      "date": "2026-04-02",
      "row": 4,
      "col": 29,
      "level": 1,
      "tooltip": "4 contributions on April 2nd."
    },
    {
      "date": "2026-04-03",
      "row": 5,
      "col": 29,
      "level": 1,
      "tooltip": "8 contributions on April 3rd."
    },
    {
      "date": "2026-04-04",
      "row": 6,
      "col": 29,
      "level": 1,
      "tooltip": "3 contributions on April 4th."
    }
  ],
  [
    {
      "date": "2026-04-05",
      "row": 0,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 5th."
    },
    {
      "date": "2026-04-06",
      "row": 1,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 6th."
    },
    {
      "date": "2026-04-07",
      "row": 2,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 7th."
    },
    {
      "date": "2026-04-08",
      "row": 3,
      "col": 30,
      "level": 1,
      "tooltip": "1 contribution on April 8th."
    },
    {
      "date": "2026-04-09",
      "row": 4,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 9th."
    },
    {
      "date": "2026-04-10",
      "row": 5,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 10th."
    },
    {
      "date": "2026-04-11",
      "row": 6,
      "col": 30,
      "level": 1,
      "tooltip": "2 contributions on April 11th."
    }
  ],
  [
    {
      "date": "2026-04-12",
      "row": 0,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 12th."
    },
    {
      "date": "2026-04-13",
      "row": 1,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 13th."
    },
    {
      "date": "2026-04-14",
      "row": 2,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 14th."
    },
    {
      "date": "2026-04-15",
      "row": 3,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 15th."
    },
    {
      "date": "2026-04-16",
      "row": 4,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 16th."
    },
    {
      "date": "2026-04-17",
      "row": 5,
      "col": 31,
      "level": 1,
      "tooltip": "2 contributions on April 17th."
    },
    {
      "date": "2026-04-18",
      "row": 6,
      "col": 31,
      "level": 1,
      "tooltip": "4 contributions on April 18th."
    }
  ],
  [
    {
      "date": "2026-04-19",
      "row": 0,
      "col": 32,
      "level": 1,
      "tooltip": "2 contributions on April 19th."
    },
    {
      "date": "2026-04-20",
      "row": 1,
      "col": 32,
      "level": 1,
      "tooltip": "4 contributions on April 20th."
    },
    {
      "date": "2026-04-21",
      "row": 2,
      "col": 32,
      "level": 1,
      "tooltip": "1 contribution on April 21st."
    },
    {
      "date": "2026-04-22",
      "row": 3,
      "col": 32,
      "level": 1,
      "tooltip": "2 contributions on April 22nd."
    },
    {
      "date": "2026-04-23",
      "row": 4,
      "col": 32,
      "level": 1,
      "tooltip": "2 contributions on April 23rd."
    },
    {
      "date": "2026-04-24",
      "row": 5,
      "col": 32,
      "level": 1,
      "tooltip": "2 contributions on April 24th."
    },
    {
      "date": "2026-04-25",
      "row": 6,
      "col": 32,
      "level": 1,
      "tooltip": "2 contributions on April 25th."
    }
  ],
  [
    {
      "date": "2026-04-26",
      "row": 0,
      "col": 33,
      "level": 1,
      "tooltip": "2 contributions on April 26th."
    },
    {
      "date": "2026-04-27",
      "row": 1,
      "col": 33,
      "level": 1,
      "tooltip": "1 contribution on April 27th."
    },
    {
      "date": "2026-04-28",
      "row": 2,
      "col": 33,
      "level": 1,
      "tooltip": "1 contribution on April 28th."
    },
    {
      "date": "2026-04-29",
      "row": 3,
      "col": 33,
      "level": 1,
      "tooltip": "4 contributions on April 29th."
    },
    {
      "date": "2026-04-30",
      "row": 4,
      "col": 33,
      "level": 1,
      "tooltip": "1 contribution on April 30th."
    },
    {
      "date": "2026-05-01",
      "row": 5,
      "col": 33,
      "level": 1,
      "tooltip": "8 contributions on May 1st."
    },
    {
      "date": "2026-05-02",
      "row": 6,
      "col": 33,
      "level": 1,
      "tooltip": "4 contributions on May 2nd."
    }
  ],
  [
    {
      "date": "2026-05-03",
      "row": 0,
      "col": 34,
      "level": 1,
      "tooltip": "2 contributions on May 3rd."
    },
    {
      "date": "2026-05-04",
      "row": 1,
      "col": 34,
      "level": 0,
      "tooltip": "No contributions on May 4th."
    },
    {
      "date": "2026-05-05",
      "row": 2,
      "col": 34,
      "level": 1,
      "tooltip": "1 contribution on May 5th."
    },
    {
      "date": "2026-05-06",
      "row": 3,
      "col": 34,
      "level": 1,
      "tooltip": "2 contributions on May 6th."
    },
    {
      "date": "2026-05-07",
      "row": 4,
      "col": 34,
      "level": 1,
      "tooltip": "1 contribution on May 7th."
    },
    {
      "date": "2026-05-08",
      "row": 5,
      "col": 34,
      "level": 1,
      "tooltip": "2 contributions on May 8th."
    },
    {
      "date": "2026-05-09",
      "row": 6,
      "col": 34,
      "level": 1,
      "tooltip": "2 contributions on May 9th."
    }
  ],
  [
    {
      "date": "2026-05-10",
      "row": 0,
      "col": 35,
      "level": 1,
      "tooltip": "2 contributions on May 10th."
    },
    {
      "date": "2026-05-11",
      "row": 1,
      "col": 35,
      "level": 1,
      "tooltip": "2 contributions on May 11th."
    },
    {
      "date": "2026-05-12",
      "row": 2,
      "col": 35,
      "level": 1,
      "tooltip": "2 contributions on May 12th."
    },
    {
      "date": "2026-05-13",
      "row": 3,
      "col": 35,
      "level": 1,
      "tooltip": "2 contributions on May 13th."
    },
    {
      "date": "2026-05-14",
      "row": 4,
      "col": 35,
      "level": 1,
      "tooltip": "2 contributions on May 14th."
    },
    {
      "date": "2026-05-15",
      "row": 5,
      "col": 35,
      "level": 1,
      "tooltip": "1 contribution on May 15th."
    },
    {
      "date": "2026-05-16",
      "row": 6,
      "col": 35,
      "level": 1,
      "tooltip": "1 contribution on May 16th."
    }
  ],
  [
    {
      "date": "2026-05-17",
      "row": 0,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 17th."
    },
    {
      "date": "2026-05-18",
      "row": 1,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 18th."
    },
    {
      "date": "2026-05-19",
      "row": 2,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 19th."
    },
    {
      "date": "2026-05-20",
      "row": 3,
      "col": 36,
      "level": 1,
      "tooltip": "1 contribution on May 20th."
    },
    {
      "date": "2026-05-21",
      "row": 4,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 21st."
    },
    {
      "date": "2026-05-22",
      "row": 5,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 22nd."
    },
    {
      "date": "2026-05-23",
      "row": 6,
      "col": 36,
      "level": 1,
      "tooltip": "2 contributions on May 23rd."
    }
  ],
  [
    {
      "date": "2026-05-24",
      "row": 0,
      "col": 37,
      "level": 1,
      "tooltip": "2 contributions on May 24th."
    },
    {
      "date": "2026-05-25",
      "row": 1,
      "col": 37,
      "level": 1,
      "tooltip": "6 contributions on May 25th."
    },
    {
      "date": "2026-05-26",
      "row": 2,
      "col": 37,
      "level": 1,
      "tooltip": "1 contribution on May 26th."
    },
    {
      "date": "2026-05-27",
      "row": 3,
      "col": 37,
      "level": 1,
      "tooltip": "4 contributions on May 27th."
    },
    {
      "date": "2026-05-28",
      "row": 4,
      "col": 37,
      "level": 1,
      "tooltip": "2 contributions on May 28th."
    },
    {
      "date": "2026-05-29",
      "row": 5,
      "col": 37,
      "level": 2,
      "tooltip": "13 contributions on May 29th."
    },
    {
      "date": "2026-05-30",
      "row": 6,
      "col": 37,
      "level": 1,
      "tooltip": "2 contributions on May 30th."
    }
  ],
  [
    {
      "date": "2026-05-31",
      "row": 0,
      "col": 38,
      "level": 1,
      "tooltip": "2 contributions on May 31st."
    },
    {
      "date": "2026-06-01",
      "row": 1,
      "col": 38,
      "level": 1,
      "tooltip": "1 contribution on June 1st."
    },
    {
      "date": "2026-06-02",
      "row": 2,
      "col": 38,
      "level": 1,
      "tooltip": "1 contribution on June 2nd."
    },
    {
      "date": "2026-06-03",
      "row": 3,
      "col": 38,
      "level": 1,
      "tooltip": "9 contributions on June 3rd."
    },
    {
      "date": "2026-06-04",
      "row": 4,
      "col": 38,
      "level": 1,
      "tooltip": "6 contributions on June 4th."
    },
    {
      "date": "2026-06-05",
      "row": 5,
      "col": 38,
      "level": 1,
      "tooltip": "6 contributions on June 5th."
    },
    {
      "date": "2026-06-06",
      "row": 6,
      "col": 38,
      "level": 0,
      "tooltip": "No contributions on June 6th."
    }
  ],
  [
    {
      "date": "2026-06-07",
      "row": 0,
      "col": 39,
      "level": 1,
      "tooltip": "2 contributions on June 7th."
    },
    {
      "date": "2026-06-08",
      "row": 1,
      "col": 39,
      "level": 1,
      "tooltip": "2 contributions on June 8th."
    },
    {
      "date": "2026-06-09",
      "row": 2,
      "col": 39,
      "level": 2,
      "tooltip": "12 contributions on June 9th."
    },
    {
      "date": "2026-06-10",
      "row": 3,
      "col": 39,
      "level": 1,
      "tooltip": "2 contributions on June 10th."
    },
    {
      "date": "2026-06-11",
      "row": 4,
      "col": 39,
      "level": 1,
      "tooltip": "2 contributions on June 11th."
    },
    {
      "date": "2026-06-12",
      "row": 5,
      "col": 39,
      "level": 2,
      "tooltip": "12 contributions on June 12th."
    },
    {
      "date": "2026-06-13",
      "row": 6,
      "col": 39,
      "level": 1,
      "tooltip": "2 contributions on June 13th."
    }
  ],
  [
    {
      "date": "2026-06-14",
      "row": 0,
      "col": 40,
      "level": 1,
      "tooltip": "8 contributions on June 14th."
    },
    {
      "date": "2026-06-15",
      "row": 1,
      "col": 40,
      "level": 1,
      "tooltip": "8 contributions on June 15th."
    },
    {
      "date": "2026-06-16",
      "row": 2,
      "col": 40,
      "level": 2,
      "tooltip": "18 contributions on June 16th."
    },
    {
      "date": "2026-06-17",
      "row": 3,
      "col": 40,
      "level": 1,
      "tooltip": "9 contributions on June 17th."
    },
    {
      "date": "2026-06-18",
      "row": 4,
      "col": 40,
      "level": 1,
      "tooltip": "2 contributions on June 18th."
    },
    {
      "date": "2026-06-19",
      "row": 5,
      "col": 40,
      "level": 1,
      "tooltip": "1 contribution on June 19th."
    },
    {
      "date": "2026-06-20",
      "row": 6,
      "col": 40,
      "level": 1,
      "tooltip": "2 contributions on June 20th."
    }
  ],
  [
    {
      "date": "2026-06-21",
      "row": 0,
      "col": 41,
      "level": 2,
      "tooltip": "12 contributions on June 21st."
    },
    {
      "date": "2026-06-22",
      "row": 1,
      "col": 41,
      "level": 1,
      "tooltip": "11 contributions on June 22nd."
    },
    {
      "date": "2026-06-23",
      "row": 2,
      "col": 41,
      "level": 2,
      "tooltip": "13 contributions on June 23rd."
    },
    {
      "date": "2026-06-24",
      "row": 3,
      "col": 41,
      "level": 1,
      "tooltip": "2 contributions on June 24th."
    },
    {
      "date": "2026-06-25",
      "row": 4,
      "col": 41,
      "level": 1,
      "tooltip": "2 contributions on June 25th."
    },
    {
      "date": "2026-06-26",
      "row": 5,
      "col": 41,
      "level": 1,
      "tooltip": "1 contribution on June 26th."
    },
    {
      "date": "2026-06-27",
      "row": 6,
      "col": 41,
      "level": 1,
      "tooltip": "4 contributions on June 27th."
    }
  ],
  [
    {
      "date": "2026-06-28",
      "row": 0,
      "col": 42,
      "level": 1,
      "tooltip": "2 contributions on June 28th."
    },
    {
      "date": "2026-06-29",
      "row": 1,
      "col": 42,
      "level": 1,
      "tooltip": "1 contribution on June 29th."
    },
    {
      "date": "2026-06-30",
      "row": 2,
      "col": 42,
      "level": 1,
      "tooltip": "2 contributions on June 30th."
    },
    {
      "date": "2026-07-01",
      "row": 3,
      "col": 42,
      "level": 1,
      "tooltip": "1 contribution on July 1st."
    },
    {
      "date": "2026-07-02",
      "row": 4,
      "col": 42,
      "level": 1,
      "tooltip": "3 contributions on July 2nd."
    },
    {
      "date": "2026-07-03",
      "row": 5,
      "col": 42,
      "level": 0,
      "tooltip": "No contributions on July 3rd."
    },
    {
      "date": "2026-07-04",
      "row": 6,
      "col": 42,
      "level": 0,
      "tooltip": "No contributions on July 4th."
    }
  ],
  [
    {
      "date": "2026-07-05",
      "row": 0,
      "col": 43,
      "level": 0,
      "tooltip": "No contributions on July 5th."
    },
    {
      "date": "2026-07-06",
      "row": 1,
      "col": 43,
      "level": 0,
      "tooltip": "No contributions on July 6th."
    },
    {
      "date": "2026-07-07",
      "row": 2,
      "col": 43,
      "level": 0,
      "tooltip": "No contributions on July 7th."
    },
    {
      "date": "2026-07-08",
      "row": 3,
      "col": 43,
      "level": 0,
      "tooltip": "No contributions on July 8th."
    },
    {
      "date": "2026-07-09",
      "row": 4,
      "col": 43,
      "level": 4,
      "tooltip": "198 contributions on July 9th."
    },
    {
      "date": "2026-07-10",
      "row": 5,
      "col": 43,
      "level": 1,
      "tooltip": "4 contributions on July 10th."
    },
    {
      "date": "2026-07-11",
      "row": 6,
      "col": 43,
      "level": 1,
      "tooltip": "2 contributions on July 11th."
    }
  ],
  [
    {
      "date": "2026-07-12",
      "row": 0,
      "col": 44,
      "level": 1,
      "tooltip": "4 contributions on July 12th."
    },
    {
      "date": "2026-07-13",
      "row": 1,
      "col": 44,
      "level": 1,
      "tooltip": "2 contributions on July 13th."
    },
    {
      "date": "2026-07-14",
      "row": 2,
      "col": 44,
      "level": 1,
      "tooltip": "3 contributions on July 14th."
    },
    {
      "date": "2026-07-15",
      "row": 3,
      "col": 44,
      "level": 1,
      "tooltip": "11 contributions on July 15th."
    },
    {
      "date": "2026-07-16",
      "row": 4,
      "col": 44,
      "level": 1,
      "tooltip": "4 contributions on July 16th."
    },
    {
      "date": "2026-07-17",
      "row": 5,
      "col": 44,
      "level": 1,
      "tooltip": "4 contributions on July 17th."
    },
    {
      "date": "2026-07-18",
      "row": 6,
      "col": 44,
      "level": 1,
      "tooltip": "3 contributions on July 18th."
    }
  ],
  [
    {
      "date": "2026-07-19",
      "row": 0,
      "col": 45,
      "level": 1,
      "tooltip": "3 contributions on July 19th."
    },
    {
      "date": "2026-07-20",
      "row": 1,
      "col": 45,
      "level": 1,
      "tooltip": "2 contributions on July 20th."
    },
    {
      "date": "2026-07-21",
      "row": 2,
      "col": 45,
      "level": 0,
      "tooltip": "No contributions on July 21st."
    },
    {
      "date": "2026-07-22",
      "row": 3,
      "col": 45,
      "level": 0,
      "tooltip": "No contributions on July 22nd."
    },
    {
      "date": "2026-07-23",
      "row": 4,
      "col": 45,
      "level": 1,
      "tooltip": "10 contributions on July 23rd."
    },
    {
      "date": "2026-07-24",
      "row": 5,
      "col": 45,
      "level": 1,
      "tooltip": "3 contributions on July 24th."
    },
    {
      "date": "2026-07-25",
      "row": 6,
      "col": 45,
      "level": 1,
      "tooltip": "6 contributions on July 25th."
    }
  ],
  [
    {
      "date": "2026-07-26",
      "row": 0,
      "col": 46,
      "level": 1,
      "tooltip": "3 contributions on July 26th."
    },
    {
      "date": "2026-07-27",
      "row": 1,
      "col": 46,
      "level": 2,
      "tooltip": "13 contributions on July 27th."
    },
    {
      "date": "2026-07-28",
      "row": 2,
      "col": 46,
      "level": 1,
      "tooltip": "2 contributions on July 28th."
    },
    {
      "date": "2026-07-29",
      "row": 3,
      "col": 46,
      "level": 1,
      "tooltip": "5 contributions on July 29th."
    },
    {
      "date": "2026-07-30",
      "row": 4,
      "col": 46,
      "level": 1,
      "tooltip": "2 contributions on July 30th."
    },
    {
      "date": "2026-07-31",
      "row": 5,
      "col": 46,
      "level": 1,
      "tooltip": "5 contributions on July 31st."
    },
    {
      "date": "2026-08-01",
      "row": 6,
      "col": 46,
      "level": 1,
      "tooltip": "3 contributions on August 1st."
    }
  ],
  [
    {
      "date": "2026-08-02",
      "row": 0,
      "col": 47,
      "level": 1,
      "tooltip": "3 contributions on August 2nd."
    },
    {
      "date": "2026-08-03",
      "row": 1,
      "col": 47,
      "level": 1,
      "tooltip": "3 contributions on August 3rd."
    },
    {
      "date": "2026-08-04",
      "row": 2,
      "col": 47,
      "level": 1,
      "tooltip": "3 contributions on August 4th."
    },
    {
      "date": "2026-08-05",
      "row": 3,
      "col": 47,
      "level": 0,
      "tooltip": "No contributions on August 5th."
    },
    {
      "date": "2026-08-06",
      "row": 4,
      "col": 47,
      "level": 1,
      "tooltip": "4 contributions on August 6th."
    },
    {
      "date": "2026-08-07",
      "row": 5,
      "col": 47,
      "level": 1,
      "tooltip": "5 contributions on August 7th."
    },
    {
      "date": "2026-08-08",
      "row": 6,
      "col": 47,
      "level": 1,
      "tooltip": "3 contributions on August 8th."
    }
  ],
  [
    {
      "date": "2026-08-09",
      "row": 0,
      "col": 48,
      "level": 1,
      "tooltip": "3 contributions on August 9th."
    },
    {
      "date": "2026-08-10",
      "row": 1,
      "col": 48,
      "level": 1,
      "tooltip": "4 contributions on August 10th."
    },
    {
      "date": "2026-08-11",
      "row": 2,
      "col": 48,
      "level": 1,
      "tooltip": "2 contributions on August 11th."
    },
    {
      "date": "2026-08-12",
      "row": 3,
      "col": 48,
      "level": 1,
      "tooltip": "4 contributions on August 12th."
    },
    {
      "date": "2026-08-13",
      "row": 4,
      "col": 48,
      "level": 1,
      "tooltip": "4 contributions on August 13th."
    },
    {
      "date": "2026-08-14",
      "row": 5,
      "col": 48,
      "level": 1,
      "tooltip": "4 contributions on August 14th."
    },
    {
      "date": "2026-08-15",
      "row": 6,
      "col": 48,
      "level": 1,
      "tooltip": "2 contributions on August 15th."
    }
  ],
  [
    {
      "date": "2026-08-16",
      "row": 0,
      "col": 49,
      "level": 1,
      "tooltip": "4 contributions on August 16th."
    },
    {
      "date": "2026-08-17",
      "row": 1,
      "col": 49,
      "level": 1,
      "tooltip": "4 contributions on August 17th."
    },
    {
      "date": "2026-08-18",
      "row": 2,
      "col": 49,
      "level": 1,
      "tooltip": "3 contributions on August 18th."
    },
    {
      "date": "2026-08-19",
      "row": 3,
      "col": 49,
      "level": 1,
      "tooltip": "5 contributions on August 19th."
    },
    {
      "date": "2026-08-20",
      "row": 4,
      "col": 49,
      "level": 1,
      "tooltip": "5 contributions on August 20th."
    },
    {
      "date": "2026-08-21",
      "row": 5,
      "col": 49,
      "level": 1,
      "tooltip": "4 contributions on August 21st."
    },
    {
      "date": "2026-08-22",
      "row": 6,
      "col": 49,
      "level": 1,
      "tooltip": "6 contributions on August 22nd."
    }
  ],
  [
    {
      "date": "2026-08-23",
      "row": 0,
      "col": 50,
      "level": 1,
      "tooltip": "2 contributions on August 23rd."
    },
    {
      "date": "2026-08-24",
      "row": 1,
      "col": 50,
      "level": 1,
      "tooltip": "8 contributions on August 24th."
    },
    {
      "date": "2026-08-25",
      "row": 2,
      "col": 50,
      "level": 1,
      "tooltip": "2 contributions on August 25th."
    },
    {
      "date": "2026-08-26",
      "row": 3,
      "col": 50,
      "level": 1,
      "tooltip": "2 contributions on August 26th."
    },
    {
      "date": "2026-08-27",
      "row": 4,
      "col": 50,
      "level": 1,
      "tooltip": "7 contributions on August 27th."
    },
    {
      "date": "2026-08-28",
      "row": 5,
      "col": 50,
      "level": 1,
      "tooltip": "2 contributions on August 28th."
    },
    {
      "date": "2026-08-29",
      "row": 6,
      "col": 50,
      "level": 1,
      "tooltip": "4 contributions on August 29th."
    }
  ],
  [
    {
      "date": "2026-08-30",
      "row": 0,
      "col": 51,
      "level": 1,
      "tooltip": "2 contributions on August 30th."
    },
    {
      "date": "2026-08-31",
      "row": 1,
      "col": 51,
      "level": 1,
      "tooltip": "4 contributions on August 31st."
    },
    {
      "date": "2026-09-01",
      "row": 2,
      "col": 51,
      "level": 4,
      "tooltip": "44 contributions on September 1st."
    },
    {
      "date": "2026-09-02",
      "row": 3,
      "col": 51,
      "level": 2,
      "tooltip": "16 contributions on September 2nd."
    },
    {
      "date": "2026-09-03",
      "row": 4,
      "col": 51,
      "level": 1,
      "tooltip": "7 contributions on September 3rd."
    },
    {
      "date": "2026-09-04",
      "row": 5,
      "col": 51,
      "level": 4,
      "tooltip": "45 contributions on September 4th."
    },
    {
      "date": "2026-09-05",
      "row": 6,
      "col": 51,
      "level": 1,
      "tooltip": "4 contributions on September 5th."
    }
  ],
  [
    {
      "date": "2026-09-06",
      "row": 0,
      "col": 52,
      "level": 1,
      "tooltip": "4 contributions on September 6th."
    },
    {
      "date": "2026-09-07",
      "row": 1,
      "col": 52,
      "level": 3,
      "tooltip": "26 contributions on September 7th."
    },
    null,
    null,
    null,
    null,
    null
  ]
];

export const TOTAL_CONTRIBUTIONS = 937;

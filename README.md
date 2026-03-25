# Multi-View Project Tracker UI

A fully functional project management frontend built with **React + TypeScript**, featuring **custom drag-and-drop, virtual scrolling, timeline visualization, and real-time collaboration simulation** — all implemented **without external UI or drag libraries**.

---

## Live Demo

https://trackyyy.netlify.app/?

## Features

###  1. Multi-View Architecture

* **Kanban Board**

  * 4 columns: To Do, In Progress, Review, Done
  * Task cards with:

    * Title
    * Assignee initials
    * Priority badge (color-coded)
    * Due date + overdue highlighting
  * Independent column scrolling

* **List View**

  * Flat table of tasks
  * Sorting by:

    * Title (A–Z)
    * Priority (Critical → Low)
    * Due Date
  * Inline status update (dropdown)
  * **Virtual scrolling** for high performance

* **Timeline / Gantt View**

  * Tasks plotted across current month
  * Horizontal bars (start → due date)
  * Priority-based color coding
  * Today marker line
  * Horizontal scroll support

---

### 2. Custom Drag-and-Drop (No Libraries)

* Built using **Pointer Events API**
* Drag preview follows cursor
* Placeholder prevents layout shift
* Drop zone highlighting
* Invalid drop → automatic snap-back
* Works on both **mouse and touch devices**

---

###  3. Virtual Scrolling (Performance Optimized)

* Only visible rows rendered
* Buffer rows added for smooth scrolling
* Uses:

  * scrollTop calculation
  * translateY positioning
* Handles **500+ tasks efficiently**

---

###  4. Live Collaboration (Simulated)

* Simulated users moving across tasks
* Avatar indicators on active cards
* Multiple users stack with `+N` indicator
* Top bar shows:

  * "X people are viewing this board"

---

###  5. Filters + URL Sync

* Multi-select filters:

  * Status
  * Priority
  * Assignee
* Instant filtering (no submit)
* URL query sync:

  * Shareable links
  * Back/refresh restores state

---

###  6. Edge Case Handling

* Empty states (columns & list)
* "Due Today" labeling
* Overdue highlighting
* Safe drag outside drop zone

---

## Tech Stack

* **React (TypeScript)**
* **Zustand** (State Management)
* **Tailwind CSS**
* No external libraries for:

  * Drag & Drop 
  * Virtual Scrolling 
  * UI Components 

---

##  Architecture

```
Zustand Store → App (Filters + State) → Views (Kanban / List / Timeline)
```

* Centralized state via Zustand
* Views consume filtered data from App
* Clean separation of logic and UI

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd project-folder
npm install
npm run dev
```

---

##  Build & Deploy

```bash
npm run build
```

Deploy using:

* Netlify
* Vercel

---

##  Performance

* Virtual scrolling ensures minimal DOM nodes
* Smooth scrolling for large datasets
* Lighthouse score: **85+ (recommended to include screenshot)**

---

## key Implementation Details

###  Drag & Drop

* Implemented using pointer events
* Clone element used for drag preview
* `elementFromPoint` used for drop detection
* Placeholder via opacity to prevent layout shift

---

### 🔹 Virtual Scrolling

* Calculated visible index range:

  ```
  startIndex = scrollTop / rowHeight
  ```
* Rendered subset of rows only
* Used `translateY` to position visible items

---

###  State Management (Zustand)

* Lightweight and minimal boilerplate
* Efficient for shared state across multiple views
* Avoids prop drilling

---

## Challenges Faced

* Implementing drag-and-drop without libraries
* Handling layout shift using placeholder technique
* Ensuring smooth virtual scrolling with large datasets

---

## 🔮 Future Improvements

* Smooth animations for drag transitions
* Task reordering within columns
* Backend integration for real-time collaboration

---



##  Author

Anant Dubey

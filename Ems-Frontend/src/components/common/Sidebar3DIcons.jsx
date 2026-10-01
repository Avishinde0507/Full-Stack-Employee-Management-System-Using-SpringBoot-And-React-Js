import React from 'react'

/**
 * High-fidelity 3D claymorphic / skeuomorphic icons for Sidebar navigation & actions.
 * Crafted with multi-layer radial/linear gradients, specular highlights, and 3D depth shadows.
 */

export function Dashboard3DIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}
    >
      <defs>
        {/* Top Left Tile: Vibrant Orange/Gold */}
        <linearGradient id="db-tl-grad" x1="2" y1="2" x2="14" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="35%" stopColor="#ff7a00" />
          <stop offset="100%" stopColor="#cc5200" />
        </linearGradient>
        {/* Top Right Tile: Electric Blue */}
        <linearGradient id="db-tr-grad" x1="17" y1="2" x2="30" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        {/* Bottom Left Tile: Aqua Cyan / Teal */}
        <linearGradient id="db-bl-grad" x1="2" y1="17" x2="14" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        {/* Bottom Right Tile: Purple/Magenta */}
        <linearGradient id="db-br-grad" x1="17" y1="17" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="40%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#9d174d" />
        </linearGradient>
        {/* Gloss highlight */}
        <linearGradient id="db-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Tile 1: Top-Left (Orange) */}
      <g>
        <rect x="3" y="4" width="11" height="10" rx="3.5" fill="#a83e00" />
        <rect x="3" y="3" width="11" height="10" rx="3.5" fill="url(#db-tl-grad)" />
        <ellipse cx="8" cy="5.5" rx="3.5" ry="1.4" fill="url(#db-gloss)" />
      </g>

      {/* 3D Tile 2: Top-Right (Blue) */}
      <g>
        <rect x="18" y="4" width="11" height="10" rx="3.5" fill="#172554" />
        <rect x="18" y="3" width="11" height="10" rx="3.5" fill="url(#db-tr-grad)" />
        <ellipse cx="23" cy="5.5" rx="3.5" ry="1.4" fill="url(#db-gloss)" />
      </g>

      {/* 3D Tile 3: Bottom-Left (Cyan) */}
      <g>
        <rect x="3" y="19" width="11" height="10" rx="3.5" fill="#083344" />
        <rect x="3" y="18" width="11" height="10" rx="3.5" fill="url(#db-bl-grad)" />
        <ellipse cx="8" cy="20.5" rx="3.5" ry="1.4" fill="url(#db-gloss)" />
      </g>

      {/* 3D Tile 4: Bottom-Right (Pink) */}
      <g>
        <rect x="18" y="19" width="11" height="10" rx="3.5" fill="#700b34" />
        <rect x="18" y="18" width="11" height="10" rx="3.5" fill="url(#db-br-grad)" />
        <ellipse cx="23" cy="20.5" rx="3.5" ry="1.4" fill="url(#db-gloss)" />
      </g>
    </svg>
  )
}

export function Employees3DIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}
    >
      <defs>
        {/* Head Gradient - Primary Avatar */}
        <radialGradient id="emp-head-main" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        {/* Body Gradient - Primary Avatar (Vibrant Blue/Indigo) */}
        <linearGradient id="emp-body-main" x1="6" y1="16" x2="20" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        {/* Head Gradient - Secondary Avatar */}
        <radialGradient id="emp-head-sec" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
        {/* Body Gradient - Secondary Avatar (Teal/Emerald) */}
        <linearGradient id="emp-body-sec" x1="16" y1="16" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        {/* Specular Highlight */}
        <linearGradient id="emp-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Secondary (Back-Right) Person */}
      <g opacity="0.9">
        {/* Body base & body */}
        <path d="M17 21C17 18 19 16.5 22 16.5C25 16.5 27 18 27 21V28C27 28.5 26.5 29 26 29H18C17.5 29 17 28.5 17 28V21Z" fill="#064e3b" />
        <path d="M17 20C17 17 19 15.5 22 15.5C25 15.5 27 17 27 20V27C27 27.5 26.5 28 26 28H18C17.5 28 17 27.5 17 27V20Z" fill="url(#emp-body-sec)" />
        {/* Head shadow & head */}
        <circle cx="22" cy="10" r="4.5" fill="#854d0e" />
        <circle cx="22" cy="9.2" r="4.5" fill="url(#emp-head-sec)" />
        <ellipse cx="20.8" cy="7.2" rx="1.6" ry="1" fill="#ffffff" opacity="0.6" />
      </g>

      {/* Primary (Front-Left) Person */}
      <g>
        {/* Body Base depth */}
        <path d="M7 19.5C7 16 9.5 14 13.5 14C17.5 14 20 16 20 19.5V29C20 29.5 19.5 30 19 30H8C7.5 30 7 29.5 7 29V19.5Z" fill="#172554" />
        {/* Body Front */}
        <path d="M7 18C7 14.5 9.5 12.8 13.5 12.8C17.5 12.8 20 14.5 20 18V28C20 28.5 19.5 29 19 29H8C7.5 29 7 28.5 7 28V18Z" fill="url(#emp-body-main)" />
        {/* Collar/Tie 3D accent */}
        <path d="M12.5 13L13.5 16L14.5 13H12.5Z" fill="#f97316" />
        {/* Body top gloss */}
        <ellipse cx="13.5" cy="15" rx="4" ry="1.5" fill="url(#emp-highlight)" />

        {/* Head Depth */}
        <circle cx="13.5" cy="7.8" r="5" fill="#9a3412" />
        {/* Head Front */}
        <circle cx="13.5" cy="7" r="5" fill="url(#emp-head-main)" />
        {/* Head specular reflection spot */}
        <ellipse cx="11.8" cy="4.8" rx="2" ry="1.2" fill="#ffffff" opacity="0.75" />
      </g>
    </svg>
  )
}

export function Departments3DIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}
    >
      <defs>
        {/* Root Top Node Gradient (Deep Royal to Light Blue) */}
        <linearGradient id="dept-root" x1="11" y1="3" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        {/* Left Child Node (Bright Orange) */}
        <linearGradient id="dept-child-left" x1="3" y1="21" x2="13" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        {/* Right Child Node (Vivid Emerald/Teal) */}
        <linearGradient id="dept-child-right" x1="19" y1="21" x2="29" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        {/* 3D Connecting Pipes Gradient */}
        <linearGradient id="dept-pipe" x1="8" y1="12" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        {/* Gloss highlight */}
        <linearGradient id="dept-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Connector Tubes */}
      <g>
        {/* Vertical stem from root */}
        <rect x="14.5" y="11" width="3" height="6" rx="1.5" fill="#475569" />
        <rect x="14.5" y="10.5" width="3" height="6" rx="1.5" fill="url(#dept-pipe)" />
        {/* Horizontal crossbar */}
        <rect x="7" y="16" width="18" height="3" rx="1.5" fill="#475569" />
        <rect x="7" y="15.5" width="18" height="3" rx="1.5" fill="url(#dept-pipe)" />
        {/* Vertical drops to children */}
        <rect x="7" y="17" width="3" height="5" rx="1.5" fill="url(#dept-pipe)" />
        <rect x="22" y="17" width="3" height="5" rx="1.5" fill="url(#dept-pipe)" />
      </g>

      {/* Top Root Node (3D Rounded Cube) */}
      <g>
        <rect x="11" y="4" width="10" height="8" rx="2.5" fill="#1e3a8a" />
        <rect x="11" y="3" width="10" height="8" rx="2.5" fill="url(#dept-root)" />
        <ellipse cx="16" cy="4.8" rx="3.5" ry="1.2" fill="url(#dept-gloss)" />
      </g>

      {/* Left Child Node (3D Rounded Cube) */}
      <g>
        <rect x="3" y="21" width="10" height="8" rx="2.5" fill="#7c2d12" />
        <rect x="3" y="20" width="10" height="8" rx="2.5" fill="url(#dept-child-left)" />
        <ellipse cx="8" cy="21.8" rx="3.5" ry="1.2" fill="url(#dept-gloss)" />
      </g>

      {/* Right Child Node (3D Rounded Cube) */}
      <g>
        <rect x="19" y="21" width="10" height="8" rx="2.5" fill="#064e3b" />
        <rect x="19" y="20" width="10" height="8" rx="2.5" fill="url(#dept-child-right)" />
        <ellipse cx="24" cy="21.8" rx="3.5" ry="1.2" fill="url(#dept-gloss)" />
      </g>
    </svg>
  )
}

export function Logout3DIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
    >
      <defs>
        {/* Door Frame 3D Depth */}
        <linearGradient id="door-frame" x1="4" y1="4" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        {/* 3D Red-to-Orange Exit Arrow */}
        <linearGradient id="exit-arrow" x1="12" y1="12" x2="30" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        {/* Door Inset Glow */}
        <linearGradient id="door-interior" x1="7" y1="7" x2="16" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="arrow-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Door Frame & Threshold */}
      <g>
        {/* Outer Frame Shadow & Bevel */}
        <path d="M4 6C4 4.34 5.34 3 7 3H16C17.66 3 19 4.34 19 6V11H15V7C15 6.45 14.55 6 14 6H8C7.45 6 7 6.45 7 7V25C7 25.55 7.45 26 8 26H14C14.55 26 15 25.55 15 25V21H19V26C19 27.66 17.66 29 16 29H7C5.34 29 4 27.66 4 26V6Z" fill="#1e293b" />
        <path d="M4 5C4 3.34 5.34 2 7 2H16C17.66 2 19 3.34 19 5V10H15V6C15 5.45 14.55 5 14 5H8C7.45 5 7 5.45 7 6V24C7 24.55 7.45 25 8 25H14C14.55 25 15 24.55 15 24V20H19V25C19 26.66 17.66 28 16 28H7C5.34 28 4 26.66 4 25V5Z" fill="url(#door-frame)" />
      </g>

      {/* 3D Eject/Logout Arrow */}
      <g>
        {/* Arrow 3D Depth Shadow */}
        <path d="M13 17.5H23V21.5L30 16.5L23 11.5V15.5H13V17.5Z" fill="#7f1d1d" />
        {/* Arrow Front Face */}
        <path d="M13 16.5H23V20.5L30 15.5L23 10.5V14.5H13V16.5Z" fill="url(#exit-arrow)" />
        {/* Arrow Specular Highlight */}
        <path d="M14 15H23.5V12L28.5 15.5L23.5 19V16H14V15Z" fill="url(#arrow-gloss)" opacity="0.45" />
      </g>
    </svg>
  )
}

/**
 * 3D EMS Brand Logo Icon (Sidebar top-left brand mark)
 */
export function EmsLogo3DIcon({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.28))' }}
    >
      <defs>
        {/* Shield / Badge Gradient */}
        <linearGradient id="ems-badge-base" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        {/* Specular curved gloss */}
        <linearGradient id="ems-badge-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* 3D Gear Gradient */}
        <linearGradient id="ems-gear-grad" x1="16" y1="3" x2="24" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        {/* 3D Person Head Gradient */}
        <radialGradient id="ems-person-head" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="55%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        {/* 3D Person Body Gradient */}
        <linearGradient id="ems-person-body" x1="10" y1="20" x2="30" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        {/* 3D Check / Tech badge */}
        <linearGradient id="ems-tech-badge" x1="26" y1="10" x2="34" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* 3D Badge Base with Depth Bevel */}
      <rect x="2" y="3.5" width="36" height="34" rx="10" fill="#082f49" />
      <rect x="2" y="2" width="36" height="34" rx="10" fill="url(#ems-badge-base)" />
      {/* Specular Highlight on Shield */}
      <ellipse cx="20" cy="8" rx="13" ry="3.5" fill="url(#ems-badge-gloss)" opacity="0.6" />

      {/* Floating 3D Golden Gear (Top-Center) */}
      <g>
        <circle cx="20" cy="8.5" r="4.2" fill="#78350f" />
        <circle cx="20" cy="7.8" r="4.2" fill="url(#ems-gear-grad)" />
        <circle cx="20" cy="7.8" r="1.8" fill="#1e3a8a" />
        {/* Gear teeth hints */}
        <rect x="19" y="2.5" width="2" height="1.8" rx="0.5" fill="#fef08a" />
        <rect x="19" y="11.3" width="2" height="1.8" rx="0.5" fill="#f59e0b" />
        <rect x="14.8" y="6.8" width="1.8" height="2" rx="0.5" fill="#fef08a" />
        <rect x="23.4" y="6.8" width="1.8" height="2" rx="0.5" fill="#f59e0b" />
      </g>

      {/* 3D Employee Person */}
      <g>
        {/* Head */}
        <circle cx="20" cy="17" r="4.5" fill="#7c2d12" />
        <circle cx="20" cy="16.2" r="4.5" fill="url(#ems-person-head)" />
        <ellipse cx="18.5" cy="14.2" rx="1.5" ry="0.9" fill="#ffffff" opacity="0.7" />

        {/* Torso / Suit */}
        <path d="M11 31C11 25.5 14.5 23 20 23C25.5 23 29 25.5 29 31V33.5C29 34 28.5 34.5 28 34.5H12C11.5 34.5 11 34 11 33.5V31Z" fill="#0f172a" opacity="0.5" />
        <path d="M11 29.5C11 24.5 14.5 22 20 22C25.5 22 29 24.5 29 29.5V32.5C29 33 28.5 33.5 28 33.5H12C11.5 33.5 11 33 11 32.5V29.5Z" fill="url(#ems-person-body)" />
        {/* Orange 3D Tie */}
        <path d="M19 22L20 27L21 22H19Z" fill="#ea580c" />
      </g>

      {/* 3D Mini Tech/Verification Badge (Top Right) */}
      <g>
        <circle cx="29" cy="13" r="3.6" fill="#082f49" />
        <circle cx="29" cy="12.3" r="3.6" fill="url(#ems-tech-badge)" />
        <path d="M27.5 12.3L28.6 13.5L30.8 11.2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/**
 * 3D Total Employees StatCard Icon
 */
export function StatEmployees3DIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        {/* Blue Primary Avatar */}
        <linearGradient id="stat-emp-blue" x1="4" y1="14" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <radialGradient id="stat-emp-blue-head" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        {/* Cyan Secondary Avatar */}
        <linearGradient id="stat-emp-cyan" x1="16" y1="16" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <radialGradient id="stat-emp-cyan-head" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
        {/* Specular gloss */}
        <linearGradient id="stat-emp-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Secondary Avatar (Right, Background) */}
      <g opacity="0.88">
        <circle cx="21" cy="9.5" r="4" fill="#083344" />
        <circle cx="21" cy="8.8" r="4" fill="url(#stat-emp-cyan-head)" />
        <ellipse cx="19.8" cy="7.2" rx="1.4" ry="0.8" fill="#ffffff" opacity="0.6" />
        <path d="M16 19C16 16.5 18 15 21 15C24 15 26 16.5 26 19V26C26 26.5 25.5 27 25 27H17C16.5 27 16 26.5 16 26V19Z" fill="#083344" />
        <path d="M16 18C16 15.5 18 14 21 14C24 14 26 15.5 26 18V25C26 25.5 25.5 26 25 26H17C16.5 26 16 25.5 16 25V18Z" fill="url(#stat-emp-cyan)" />
      </g>

      {/* Primary Avatar (Left, Foreground) */}
      <g>
        {/* Head */}
        <circle cx="12" cy="8" r="4.8" fill="#172554" />
        <circle cx="12" cy="7.2" r="4.8" fill="url(#stat-emp-blue-head)" />
        <ellipse cx="10.5" cy="5.2" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.75" />

        {/* Body 3D */}
        <path d="M6 19C6 15.5 8.5 13.5 12 13.5C15.5 13.5 18 15.5 18 19V28C18 28.5 17.5 29 17 29H7C6.5 29 6 28.5 6 28V19Z" fill="#172554" />
        <path d="M6 17.5C6 14 8.5 12 12 12C15.5 12 18 14 18 17.5V26.5C18 27 17.5 27.5 17 27.5H7C6.5 27.5 6 27 6 26.5V17.5Z" fill="url(#stat-emp-blue)" />
        <ellipse cx="12" cy="14" rx="3.5" ry="1.2" fill="url(#stat-emp-gloss)" />
      </g>
    </svg>
  )
}

/**
 * 3D Departments StatCard Icon
 */
export function StatDepartments3DIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(234, 88, 12, 0.25))' }}
    >
      <defs>
        {/* Top Node (Vibrant Orange) */}
        <linearGradient id="stat-dept-top" x1="11" y1="3" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        {/* Bottom Left Node (Amber/Gold) */}
        <linearGradient id="stat-dept-bl" x1="3" y1="20" x2="13" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        {/* Bottom Right Node (Warm Coral/Red) */}
        <linearGradient id="stat-dept-br" x1="19" y1="20" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        {/* Pipe Gradient */}
        <linearGradient id="stat-dept-pipe" x1="8" y1="12" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="stat-dept-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Connector Tubes */}
      <g>
        <rect x="14.5" y="11" width="3" height="6" rx="1.5" fill="#7c2d12" />
        <rect x="14.5" y="10.5" width="3" height="6" rx="1.5" fill="url(#stat-dept-pipe)" />
        <rect x="7" y="16" width="18" height="3" rx="1.5" fill="#7c2d12" />
        <rect x="7" y="15.5" width="18" height="3" rx="1.5" fill="url(#stat-dept-pipe)" />
        <rect x="7" y="17" width="3" height="5" rx="1.5" fill="url(#stat-dept-pipe)" />
        <rect x="22" y="17" width="3" height="5" rx="1.5" fill="url(#stat-dept-pipe)" />
      </g>

      {/* Top Node Cube */}
      <g>
        <rect x="11" y="4" width="10" height="8" rx="2.5" fill="#7c2d12" />
        <rect x="11" y="3" width="10" height="8" rx="2.5" fill="url(#stat-dept-top)" />
        <ellipse cx="16" cy="4.8" rx="3.5" ry="1.2" fill="url(#stat-dept-gloss)" />
      </g>

      {/* Bottom Left Node */}
      <g>
        <rect x="3" y="21" width="10" height="8" rx="2.5" fill="#78350f" />
        <rect x="3" y="20" width="10" height="8" rx="2.5" fill="url(#stat-dept-bl)" />
        <ellipse cx="8" cy="21.8" rx="3.5" ry="1.2" fill="url(#stat-dept-gloss)" />
      </g>

      {/* Bottom Right Node */}
      <g>
        <rect x="19" y="21" width="10" height="8" rx="2.5" fill="#7f1d1d" />
        <rect x="19" y="20" width="10" height="8" rx="2.5" fill="url(#stat-dept-br)" />
        <ellipse cx="24" cy="21.8" rx="3.5" ry="1.2" fill="url(#stat-dept-gloss)" />
      </g>
    </svg>
  )
}

/**
 * 3D Active Employees StatCard Icon
 */
export function StatActive3DIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 5px rgba(16, 185, 129, 0.3))' }}
    >
      <defs>
        {/* Emerald Sphere Gradient */}
        <radialGradient id="stat-act-sphere" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        {/* Curved Gloss */}
        <linearGradient id="stat-act-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Sphere Base & Depth */}
      <circle cx="16" cy="17.2" r="13" fill="#064e3b" />
      <circle cx="16" cy="16" r="13" fill="url(#stat-act-sphere)" />
      {/* Specular Highlight */}
      <ellipse cx="16" cy="9" rx="8" ry="3.5" fill="url(#stat-act-gloss)" opacity="0.75" />

      {/* 3D Checkmark */}
      <g>
        {/* Check Shadow */}
        <path
          d="M9.5 16.5L14 21L22.5 12"
          stroke="#064e3b"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Check Face */}
        <path
          d="M9.5 15.5L14 20L22.5 11"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

/**
 * 3D Inactive Employees StatCard Icon (Red theme)
 */
export function StatInactive3DIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 5px rgba(239, 68, 68, 0.35))' }}
    >
      <defs>
        {/* Red Sphere Gradient */}
        <radialGradient id="stat-inact-sphere-red" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <linearGradient id="stat-inact-gloss-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Sphere Base & Depth */}
      <circle cx="16" cy="17.2" r="13" fill="#7f1d1d" />
      <circle cx="16" cy="16" r="13" fill="url(#stat-inact-sphere-red)" />
      {/* Specular Highlight */}
      <ellipse cx="16" cy="9" rx="8" ry="3.5" fill="url(#stat-inact-gloss-red)" opacity="0.75" />

      {/* 3D Pause Bars */}
      <g>
        {/* Pause Bars Shadow */}
        <rect x="11.5" y="11.8" width="3.2" height="10" rx="1.6" fill="#7f1d1d" />
        <rect x="17.3" y="11.8" width="3.2" height="10" rx="1.6" fill="#7f1d1d" />
        {/* Pause Bars Front Face */}
        <rect x="11.5" y="11" width="3.2" height="10" rx="1.6" fill="#ffffff" />
        <rect x="17.3" y="11" width="3.2" height="10" rx="1.6" fill="#ffffff" />
      </g>
    </svg>
  )
}

/**
 * 3D Chevron Arrow Icon (Sidebar Collapse/Expand toggle button)
 */
export function Chevron3DIcon({ direction = 'left', size = 16, className = '' }) {
  const isRight = direction === 'right'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        transform: isRight ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease',
        filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))',
      }}
    >
      <defs>
        <linearGradient id="chev-grad" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cffafe" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      {/* 3D Depth Shadow */}
      <path
        d="M15 6L9 12L15 18"
        stroke="#083344"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 3D Front Face */}
      <path
        d="M15 5L9 11L15 17"
        stroke="url(#chev-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 3D View / Eye Action Icon
 */
export function View3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        {/* Eye Sclera / Shell */}
        <linearGradient id="view-sclera" x1="2" y1="6" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        {/* 3D Iris Gradient (Blue/Cyan) */}
        <radialGradient id="view-iris" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>

      {/* Sclera Shadow & Body */}
      <path
        d="M1 12.5C2.8 7.5 7 4.5 12 4.5C17 4.5 21.2 7.5 23 12.5C21.2 17.5 17 20.5 12 20.5C7 20.5 2.8 17.5 1 12.5Z"
        fill="#1e3a8a"
        opacity="0.3"
      />
      <path
        d="M1 12C2.8 7 7 4 12 4C17 4 21.2 7 23 12C21.2 17 17 20 12 20C7 20 2.8 17 1 12Z"
        fill="url(#view-sclera)"
        stroke="#3b82f6"
        strokeWidth="1.2"
      />

      {/* 3D Iris */}
      <circle cx="12" cy="12" r="4.6" fill="url(#view-iris)" />

      {/* Pupil */}
      <circle cx="12" cy="12" r="2.2" fill="#0f172a" />

      {/* Specular Glint */}
      <circle cx="10.8" cy="10.8" r="1.1" fill="#ffffff" />
      <circle cx="13.2" cy="13.2" r="0.5" fill="#ffffff" opacity="0.8" />
    </svg>
  )
}

/**
 * 3D Edit / Pencil Action Icon
 */
export function Edit3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(249, 115, 22, 0.25))' }}
    >
      <defs>
        {/* Pencil Barrel Gradient (Orange / Amber) */}
        <linearGradient id="edit-barrel" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="30%" stopColor="#fb923c" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        {/* Ferrule / Metal band */}
        <linearGradient id="edit-metal" x1="16" y1="2" x2="22" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        {/* Eraser */}
        <linearGradient id="edit-eraser" x1="18" y1="1" x2="23" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>

      {/* 3D Drop Shadow */}
      <g opacity="0.3">
        <path d="M4 21L7.5 20.2L17.5 10.2L14.2 6.9L4.2 16.9L3.5 20.5L4 21Z" fill="#7c2d12" />
      </g>

      {/* Pencil Body Shaft */}
      <path
        d="M6 18L16.2 7.8L13.8 5.4L3.6 15.6L3 19.5L6.9 18.9L6 18Z"
        fill="url(#edit-barrel)"
      />

      {/* Specular Ridge Line */}
      <line x1="5.5" y1="16" x2="14.5" y2="7" stroke="#ffffff" strokeWidth="0.8" opacity="0.65" strokeLinecap="round" />

      {/* Metal Ferrule Band */}
      <path
        d="M13.8 5.4L16.2 7.8L18.4 5.6L16 3.2L13.8 5.4Z"
        fill="url(#edit-metal)"
      />

      {/* 3D Eraser Cap */}
      <path
        d="M16.5 2.7L18.9 5.1C19.7 4.3 20.8 4.3 21.6 5.1C22.4 4.3 22.4 3.2 21.6 2.4C20.8 1.6 19.7 1.6 18.9 2.4L16.5 2.7Z"
        fill="url(#edit-eraser)"
      />

      {/* Pencil Tip (Wood + Graphite) */}
      <path d="M3 19.5L5 20L3.5 20.5L3 19.5Z" fill="#1e293b" />
      <path d="M3.6 15.6L5 20L6.9 18.9L3.6 15.6Z" fill="#fed7aa" opacity="0.75" />
      <path d="M3 19.5L4 19.8L3.4 20.4L3 19.5Z" fill="#0f172a" />
    </svg>
  )
}

/**
 * 3D Delete / Trash Action Icon
 */
export function Delete3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(239, 68, 68, 0.28))' }}
    >
      <defs>
        {/* Can Body Gradient */}
        <linearGradient id="del-can" x1="5" y1="8" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="80%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        {/* Lid Gradient */}
        <linearGradient id="del-lid" x1="4" y1="4" x2="20" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="50%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        {/* Specular gloss */}
        <linearGradient id="del-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Base Shadow */}
      <ellipse cx="12" cy="21.5" rx="6" ry="1.5" fill="#7f1d1d" opacity="0.35" />

      {/* 3D Bin Body */}
      <path
        d="M6 8.5L7.2 20C7.3 20.8 8 21.5 8.8 21.5H15.2C16 21.5 16.7 20.8 16.8 20L18 8.5H6Z"
        fill="url(#del-can)"
      />

      {/* Body Ribs / Specular sheen */}
      <line x1="9.5" y1="10.5" x2="10" y2="19.5" stroke="#ffffff" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      <line x1="12" y1="10.5" x2="12" y2="19.5" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="14.5" y1="10.5" x2="14" y2="19.5" stroke="#7f1d1d" strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />

      {/* 3D Bin Lid */}
      <rect x="4" y="6" width="16" height="2.5" rx="1.2" fill="#7f1d1d" />
      <rect x="4" y="5.2" width="16" height="2.5" rx="1.2" fill="url(#del-lid)" />
      <ellipse cx="12" cy="6" rx="6" ry="0.8" fill="url(#del-gloss)" />

      {/* Lid Top Handle */}
      <rect x="9.5" y="3" width="5" height="2.5" rx="1" fill="#7f1d1d" />
      <rect x="9.5" y="2.4" width="5" height="2.5" rx="1" fill="url(#del-lid)" />
      <rect x="10.8" y="3.6" width="2.4" height="1" rx="0.5" fill="#7f1d1d" />
    </svg>
  )
}

/**
 * 3D Profile / User Avatar Icon
 */
export function Profile3DIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 3px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        {/* Head Sphere Gradient */}
        <radialGradient id="prof-head-3d" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="85%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        {/* Body Arc Gradient */}
        <linearGradient id="prof-body-3d" x1="4" y1="13" x2="20" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        {/* Specular gloss */}
        <linearGradient id="prof-gloss-3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Head Shadow & 3D Sphere */}
      <circle cx="12" cy="7.2" r="4.2" fill="#172554" />
      <circle cx="12" cy="6.5" r="4.2" fill="url(#prof-head-3d)" />
      {/* Head Specular Highlight */}
      <ellipse cx="10.8" cy="4.8" rx="1.6" ry="1" fill="#ffffff" opacity="0.75" />

      {/* Body Shadow & 3D Arc */}
      <path
        d="M4 21C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 21V22C20 22.5 19.5 23 19 23H5C4.5 23 4 22.5 4 22V21Z"
        fill="#172554"
      />
      <path
        d="M4 19.8C4 15.5 7.5 13.2 12 13.2C16.5 13.2 20 15.5 20 19.8V21.5C20 22 19.5 22.5 19 22.5H5C4.5 22.5 4 22 4 21.5V19.8Z"
        fill="url(#prof-body-3d)"
      />
      {/* Specular Curve on Shoulders */}
      <ellipse cx="12" cy="14.8" rx="4.5" ry="1.2" fill="url(#prof-gloss-3d)" />
    </svg>
  )
}

/**
 * 3D Back Arrow Icon (for Dashboard back link)
 */
export function BackArrow3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(15, 23, 42, 0.2))' }}
    >
      <defs>
        <linearGradient id="back-arrow-grad" x1="4" y1="6" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      {/* 3D Base Shadow */}
      <path d="M19 12.8H7.5L12 17.3L10.6 18.7L3.9 12L10.6 5.3L12 6.7L7.5 11.2H19V12.8Z" fill="#0f172a" opacity="0.3" />
      {/* 3D Front Arrow */}
      <path d="M19 12H7.5L12 16.5L10.6 17.9L3.9 11.2L10.6 4.5L12 5.9L7.5 10.4H19V12Z" fill="url(#back-arrow-grad)" />
    </svg>
  )
}

/**
 * 3D Shield Check Icon (for ADMIN Role badge)
 */
export function ShieldCheck3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(234, 88, 12, 0.3))' }}
    >
      <defs>
        <linearGradient id="sc-shield-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="35%" stopColor="#fb923c" />
          <stop offset="85%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="sc-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 3D Shield Shadow */}
      <path d="M12 22.8C7.5 20.8 4 16.3 4 11.8V5.8L12 2.8L20 5.8V11.8C20 16.3 16.5 20.8 12 22.8Z" fill="#7c2d12" />
      {/* 3D Shield Face */}
      <path d="M12 22C7.5 20 4 15.5 4 11V5L12 2L20 5V11C20 15.5 16.5 20 12 22Z" fill="url(#sc-shield-grad)" />
      {/* Specular Highlight */}
      <ellipse cx="12" cy="7" rx="5" ry="2" fill="url(#sc-gloss)" opacity="0.65" />
      {/* 3D Check */}
      <path d="M9 11.5L11 13.5L15.5 9" stroke="#7c2d12" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11L11 13L15.5 8.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * 3D Badge Check Icon (for Active Status badge)
 */
export function BadgeCheck3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(37, 99, 235, 0.3))' }}
    >
      <defs>
        <radialGradient id="bc-circle-grad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <linearGradient id="bc-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12.8" r="9.5" fill="#1e3a8a" />
      <circle cx="12" cy="12" r="9.5" fill="url(#bc-circle-grad)" />
      <ellipse cx="12" cy="7.5" rx="5.5" ry="2.2" fill="url(#bc-gloss)" opacity="0.7" />
      <path d="M8.5 12.3L11 14.8L16 9.8" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 11.8L11 14.3L16 9.3" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * 3D Info Circle Icon (for Information Tab)
 */
export function Info3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        <radialGradient id="info-grad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <linearGradient id="info-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12.8" r="9.5" fill="#1e3a8a" />
      <circle cx="12" cy="12" r="9.5" fill="url(#info-grad)" />
      <ellipse cx="12" cy="7.2" rx="5" ry="2.2" fill="url(#info-gloss)" opacity="0.75" />
      <circle cx="12" cy="7.5" r="1.3" fill="#ffffff" />
      <rect x="10.8" y="10.5" width="2.4" height="6.5" rx="1.2" fill="#ffffff" />
    </svg>
  )
}

/**
 * 3D Shield Lock Icon (for Security Tab)
 */
export function ShieldLock3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(100, 116, 139, 0.25))' }}
    >
      <defs>
        <linearGradient id="sl-shield" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <path d="M12 22.8C7.5 20.8 4 16.3 4 11.8V5.8L12 2.8L20 5.8V11.8C20 16.3 16.5 20.8 12 22.8Z" fill="#1e293b" />
      <path d="M12 22C7.5 20 4 15.5 4 11V5L12 2L20 5V11C20 15.5 16.5 20 12 22Z" fill="url(#sl-shield)" />
      {/* 3D Padlock inside */}
      <path d="M10 10V8.5C10 7.4 10.9 6.5 12 6.5C13.1 6.5 14 7.4 14 8.5V10H10Z" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="9" y="10" width="6" height="5" rx="1.5" fill="#f59e0b" />
      <circle cx="12" cy="12" r="0.8" fill="#1e293b" />
    </svg>
  )
}

/**
 * 3D Person Badge Icon (for Account Information section header)
 */
export function PersonBadge3DIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 3px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        <linearGradient id="pb-badge" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="4" y="3.8" width="16" height="18" rx="3.5" fill="#172554" />
      <rect x="4" y="3" width="16" height="18" rx="3.5" fill="url(#pb-badge)" />
      {/* Clip slot */}
      <rect x="9.5" y="4.5" width="5" height="1.6" rx="0.8" fill="#ffffff" opacity="0.8" />
      {/* Avatar Silhouette */}
      <circle cx="12" cy="10" r="2.8" fill="#ffffff" />
      <path d="M7.5 17C7.5 14.5 9.5 13.5 12 13.5C14.5 13.5 16.5 14.5 16.5 17H7.5Z" fill="#ffffff" />
    </svg>
  )
}

/**
 * 3D User Card Icon (for Full Name info field)
 */
export function UserCard3DIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        <linearGradient id="uc-grad" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <radialGradient id="uc-head" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      <rect x="3" y="4.8" width="18" height="16" rx="3.5" fill="#172554" />
      <rect x="3" y="4" width="18" height="16" rx="3.5" fill="url(#uc-grad)" />
      {/* 3D Head */}
      <circle cx="9" cy="11.5" r="3.2" fill="url(#uc-head)" />
      <ellipse cx="8.2" cy="10" rx="1.2" ry="0.7" fill="#ffffff" opacity="0.75" />
      {/* ID info lines */}
      <rect x="14" y="8.5" width="5" height="1.8" rx="0.9" fill="#ffffff" opacity="0.9" />
      <rect x="14" y="11.8" width="4" height="1.8" rx="0.9" fill="#fed7aa" opacity="0.9" />
      <rect x="14" y="15" width="5" height="1.8" rx="0.9" fill="#ffffff" opacity="0.7" />
    </svg>
  )
}

/**
 * 3D Mail / Envelope Icon (for Email Address info field)
 */
export function Mail3DIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(6, 182, 212, 0.28))' }}
    >
      <defs>
        <linearGradient id="mail-body" x1="2" y1="5" x2="22" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="mail-flap" x1="2" y1="5" x2="22" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      {/* 3D Envelope Base */}
      <rect x="2" y="5.8" width="20" height="14" rx="3" fill="#083344" />
      <rect x="2" y="5" width="20" height="14" rx="3" fill="url(#mail-body)" />
      {/* Envelope Flap Fold */}
      <path d="M2 7L12 14L22 7" stroke="#083344" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M2 6.5L12 13.5L22 6.5" stroke="url(#mail-flap)" strokeWidth="2.2" strokeLinejoin="round" />
      {/* 3D Wax Seal Accent */}
      <circle cx="12" cy="13.5" r="2.4" fill="#f59e0b" />
      <circle cx="12" cy="13.2" r="1.5" fill="#fef08a" />
    </svg>
  )
}

/**
 * 3D Role / Crown Icon (for Role info field)
 */
export function Role3DIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(245, 158, 11, 0.35))' }}
    >
      <defs>
        <linearGradient id="role-crown" x1="3" y1="6" x2="21" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Crown Shadow */}
      <path d="M3 18.8L4.5 9L9 13.5L12 7L15 13.5L19.5 9L21 18.8H3Z" fill="#78350f" />
      {/* Crown Face */}
      <path d="M3 18L4.5 8L9 12.5L12 6L15 12.5L19.5 8L21 18H3Z" fill="url(#role-crown)" />
      {/* Jewels on peaks */}
      <circle cx="4.5" cy="8" r="1.4" fill="#ffffff" />
      <circle cx="12" cy="6" r="1.6" fill="#f43f5e" />
      <circle cx="19.5" cy="8" r="1.4" fill="#ffffff" />
      {/* Crown Base Band */}
      <rect x="3" y="17" width="18" height="3" rx="1.2" fill="#78350f" />
      <rect x="3" y="16.5" width="18" height="3" rx="1.2" fill="#fbbf24" />
    </svg>
  )
}

/**
 * 3D Status Pulse Icon (for Status info field)
 */
export function StatusPulse3DIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 3px rgba(16, 185, 129, 0.35))' }}
    >
      <defs>
        <radialGradient id="sp-orb" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
      </defs>
      {/* Outer Pulse Wave */}
      <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="1.2" opacity="0.35" />
      {/* 3D Orb Shadow & Face */}
      <circle cx="12" cy="12.6" r="6" fill="#064e3b" />
      <circle cx="12" cy="12" r="6" fill="url(#sp-orb)" />
      <ellipse cx="10.8" cy="9.5" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.8" />
      {/* Mini Checkmark */}
      <path d="M9.8 12.2L11.2 13.6L14.4 10.4" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * 3D Shield Star Icon (for Permissions & Privileges Section Header)
 */
export function ShieldStar3DIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 1px 3px rgba(234, 88, 12, 0.3))' }}
    >
      <defs>
        <linearGradient id="ss-shield" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <path d="M12 22.8C7.5 20.8 4 16.3 4 11.8V5.8L12 2.8L20 5.8V11.8C20 16.3 16.5 20.8 12 22.8Z" fill="#7c2d12" />
      <path d="M12 22C7.5 20 4 15.5 4 11V5L12 2L20 5V11C20 15.5 16.5 20 12 22Z" fill="url(#ss-shield)" />
      {/* 3D Star in Center */}
      <polygon points="12,6.5 13.5,10 17,10.3 14.3,12.7 15.1,16.2 12,14.3 8.9,16.2 9.7,12.7 7,10.3 10.5,10" fill="#ffffff" />
    </svg>
  )
}

/**
 * 3D Analytics Icon (for Dashboard & Analytics Permission Card)
 */
export function Analytics3DIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.25))' }}
    >
      <defs>
        <linearGradient id="bar-1" x1="4" y1="16" x2="10" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="bar-2" x1="13" y1="8" x2="19" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="bar-3" x1="22" y1="3" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Bar 1 */}
      <rect x="4" y="17" width="6" height="12" rx="2" fill="#172554" />
      <rect x="4" y="16" width="6" height="12" rx="2" fill="url(#bar-1)" />
      {/* Bar 2 */}
      <rect x="13" y="9" width="6" height="19" rx="2" fill="#082f49" />
      <rect x="13" y="8" width="6" height="19" rx="2" fill="url(#bar-2)" />
      {/* Bar 3 */}
      <rect x="22" y="4" width="6" height="24" rx="2" fill="#7c2d12" />
      <rect x="22" y="3" width="6" height="24" rx="2" fill="url(#bar-3)" />
      {/* Specular Caps */}
      <ellipse cx="7" cy="17" rx="2.5" ry="1" fill="#ffffff" opacity="0.75" />
      <ellipse cx="16" cy="9" rx="2.5" ry="1" fill="#ffffff" opacity="0.75" />
      <ellipse cx="25" cy="4" rx="2.5" ry="1" fill="#ffffff" opacity="0.75" />
    </svg>
  )
}

/**
 * 3D Key Icon (for Security Access Permission Card)
 */
export function Key3DIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(234, 88, 12, 0.3))' }}
    >
      <defs>
        <linearGradient id="key-gold" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="75%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      {/* Key Base Shadow */}
      <g opacity="0.35">
        <circle cx="10" cy="16.8" r="6" fill="#7c2d12" />
        <rect x="14" y="14.8" width="14" height="4" rx="1.5" fill="#7c2d12" />
        <rect x="22" y="18.8" width="2.5" height="4" rx="1" fill="#7c2d12" />
        <rect x="25.5" y="18.8" width="2.5" height="3" rx="1" fill="#7c2d12" />
      </g>
      {/* Key Front Face */}
      <circle cx="10" cy="16" r="6" fill="url(#key-gold)" />
      <circle cx="10" cy="16" r="2.8" fill="#ffffff" />
      <rect x="14" y="14" width="14" height="4" rx="1.5" fill="url(#key-gold)" />
      {/* Key Teeth */}
      <rect x="22" y="18" width="2.5" height="4" rx="1" fill="url(#key-gold)" />
      <rect x="25.5" y="18" width="2.5" height="3" rx="1" fill="url(#key-gold)" />
      {/* Specular Glint */}
      <ellipse cx="8.5" cy="13" rx="2" ry="1" fill="#ffffff" opacity="0.8" />
    </svg>
  )
}

/**
 * 3D Add / Plus Button Icon (vibrant green gradient sphere with white "+")
 */
export function AddPlus3DIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 5px rgba(16,185,129,0.45))' }}
    >
      <defs>
        {/* Green Gradient Sphere */}
        <radialGradient id="add-sphere" cx="33%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="35%" stopColor="#10b981" />
          <stop offset="75%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        {/* Specular Gloss */}
        <linearGradient id="add-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Sphere Depth Shadow */}
      <circle cx="16" cy="17.5" r="14" fill="#064e3b" />
      {/* 3D Sphere Front */}
      <circle cx="16" cy="16" r="14" fill="url(#add-sphere)" />
      {/* Specular Highlight */}
      <ellipse cx="16" cy="8.5" rx="8.5" ry="3.8" fill="url(#add-gloss)" opacity="0.7" />

      {/* 3D Plus Shadow */}
      <rect x="14.2" y="9.2" width="3.6" height="14" rx="1.8" fill="#064e3b" opacity="0.55" />
      <rect x="9.2" y="14.2" width="14" height="3.6" rx="1.8" fill="#064e3b" opacity="0.55" />
      {/* 3D Plus Face */}
      <rect x="14.2" y="8.5" width="3.6" height="14" rx="1.8" fill="#ffffff" />
      <rect x="9.2" y="13.5" width="14" height="3.6" rx="1.8" fill="#ffffff" />
    </svg>
  )
}

/**
 * 3D View All / Arrow Right Icon (cyan-teal gradient pill with white arrow)
 */
export function ViewAll3DIcon({ size = 14, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(6,182,212,0.4))' }}
    >
      <defs>
        <linearGradient id="va-pill" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="va-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 3D Pill Depth Shadow */}
      <rect x="2" y="7.5" width="28" height="18" rx="9" fill="#083344" />
      {/* 3D Pill Front */}
      <rect x="2" y="6" width="28" height="18" rx="9" fill="url(#va-pill)" />
      {/* Specular Highlight */}
      <ellipse cx="16" cy="9" rx="9" ry="2.8" fill="url(#va-gloss)" opacity="0.7" />

      {/* 3D Arrow Shadow */}
      <path d="M10 16.8L17.5 15L10 13.2" stroke="#083344" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M17 16.8L22 15L17 13.2" stroke="#083344" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      {/* 3D Arrow Face */}
      <path d="M10 16L17.5 15L10 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 16L22 15L17 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


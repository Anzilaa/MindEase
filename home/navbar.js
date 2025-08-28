// navbar.js
// Handles rendering and logic for the navbar, dropdown, and sidebar in main.html

export function renderNavbar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 16px;">
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <span style="font-weight: bold; font-size: 1.5em; letter-spacing: 2px;">MindEase</span>
        <div style="margin-top: 10px; position: relative;">
          <button id="dropdown-toggle" style="background: none; border: none; cursor: pointer; outline: none; position: relative; z-index: 3100;">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect y="7" width="32" height="3" rx="1.5" fill="#333" />
              <rect y="14" width="32" height="3" rx="1.5" fill="#333" />
              <rect y="21" width="32" height="3" rx="1.5" fill="#333" />
            </svg>
          </button>
          <div id="dropdown-menu" style="position: absolute; left: 0; top: 40px; background: #f4f4f4; box-shadow: 0 2px 8px #0002; border-radius: 6px; padding: 12px 0; min-width: 180px; z-index: 3200; display: none;">
            <nav style="display: flex; flex-direction: column; gap: 0">
              <a href="main.html" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Home Page</a>
              <a href="profile.html" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Profile</a>
              <a href="emergency.html" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Emergency Contacts</a>
              <a href="#resources" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Resources</a>
              <a href="focus.html" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Focus</a>
              <a href="#news" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">News</a>
              <a href="#reports" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Reports</a>
              <a href="#home" style="padding: 10px 24px; color: #333; text-decoration: none; font-weight: 500;">Home</a>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <a href="main.html" style="margin-right: 24px; color: #4f46e5; text-decoration: none; font-weight: 500;">Home</a>
        <a href="../root/about.html" style="margin-right: 24px; color: #4f46e5; text-decoration: none; font-weight: 500;">About Us</a>
        <a href="contact.html" style="margin-right: 24px; color: #4f46e5; text-decoration: none; font-weight: 500;">Contact</a>
        <a href="feedback.html" style="color: #4f46e5; text-decoration: none; font-weight: 500;">Feedback</a>
      </div>
    </div>
  `;

  // Dropdown logic
  const toggleBtn = document.getElementById("dropdown-toggle");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (toggleBtn && dropdownMenu) {
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function (e) {
      if (!toggleBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  }
}

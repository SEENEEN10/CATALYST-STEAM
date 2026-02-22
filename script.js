const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const orderForm = document.getElementById("orderForm");
const orderStatus = document.getElementById("orderStatus");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const buyerName = String(formData.get("buyer_name") || "").trim();
    const buyerPhone = String(formData.get("buyer_phone") || "").trim();
    const deliveryAddress = String(formData.get("delivery_address") || "").trim();
    const senderName = String(formData.get("sender_name") || "").trim();
    const senderPhone = String(formData.get("sender_phone") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const lines = [
      "طلب شراء جديد - Catalyst Steam",
      `الاسم: ${buyerName}`,
      `رقم الموبايل: ${buyerPhone}`,
      `عنوان التوصيل: ${deliveryAddress}`,
      `اسم المُرسِل للتحويل: ${senderName}`,
      `رقم موبايل المُرسِل: ${senderPhone}`,
      notes ? `ملاحظات: ${notes}` : null,
      "تم الاطلاع على شرط الدفع قبل الاستلام.",
    ].filter(Boolean);

    const url = `https://wa.me/201044175125?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (orderStatus) {
      orderStatus.textContent = "تم تجهيز رسالة الطلب وفتح واتساب لإرسالها.";
    }
  });
}

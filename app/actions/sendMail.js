'use server';

export async function sendMail(formData) {
  const ACCESS_KEY = process.env.MAIL_ACCESS_KEY;

  if (!ACCESS_KEY) {
    console.error("MAIL_ACCESS_KEY missing");
    throw new Error("Missing ACCESS KEY");
  }

  formData.append("access_key", ACCESS_KEY);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const text = await response.text();
  console.log("Web3Forms raw response:", text);   // ← IMPORTANT

  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Invalid JSON — HTML returned instead:", text);
    throw new Error("Web3Forms returned HTML, not JSON");
  }
}

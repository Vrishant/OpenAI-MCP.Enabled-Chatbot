document.getElementById("sendBtn").addEventListener("click", async () => {
  const queryInput = document.getElementById("queryInput");
  const responseDiv = document.getElementById("response");
  const query = queryInput.value.trim();

  if (!query) {
    responseDiv.textContent = "Please enter a query.";
    return;
  }

  responseDiv.textContent = "Loading...";

  try {
    const res = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { error: "Unknown error" };
      }
      responseDiv.textContent = "Error: " + (errorData.error || "Unknown error");
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch {
      responseDiv.textContent = "Error: Invalid JSON response from server";
      return;
    }
    // Show only the final message, not intermediate tool messages
    const finalMessage = data.response.split('\n').filter(line => !line.startsWith('[Tool:')).join('\n');
    responseDiv.textContent = finalMessage || "No response";
  } catch (err) {
    responseDiv.textContent = "Error: " + err.message;
  }
});

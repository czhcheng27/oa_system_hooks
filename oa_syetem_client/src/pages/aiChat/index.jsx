import React, { useState, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/styles/github.css"; // 推荐
import "../../assets/css/markdown.css";

// 配置 marked 支持高亮
marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "language-",
});

export default function AiChat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "你是一个助手。" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setIsStreaming(true); // 开始流式传输

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.body) throw new Error("ReadableStream not supported");
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantMessage = "";
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.replace(/^data: /, "").trim();

            if (data === "[DONE]") {
              done = true;
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.content;
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last.role === "assistant") {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantMessage,
                    };
                    return updated;
                  } else {
                    return [
                      ...prev,
                      { role: "assistant", content: assistantMessage },
                    ];
                  }
                });
              }
            } catch (e) {
              console.warn("解析失败:", e);
            }
          }
        }
      }

      // ✅ 等流式传输完再高亮
      setTimeout(() => {
        const blocks = document.querySelectorAll(".markdown-body pre code");
        blocks.forEach((block) => hljs.highlightElement(block));
      }, 0);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("请求被中断");
      } else {
        console.error("请求失败:", err);
      }
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "1px solid #ddd",
          padding: 10,
          minHeight: 300,
          backgroundColor: "#f9f9f9",
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {console.log(`messages`, messages)}
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                color: msg.role === "user" ? "#0070f3" : "#000",
                marginBottom: 12,
              }}
            >
              <b>{msg.role === "user" ? "你" : "助手"}:</b>
              <div>
                {msg.role === "assistant" ? (
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                    style={{
                      backgroundColor: "#fff",
                      padding: "6px 10px",
                      borderRadius: 4,
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "#e6f4ff",
                      padding: "6px 10px",
                      borderRadius: 4,
                      marginTop: 4,
                    }}
                  >
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <input
        disabled={loading}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "100%", padding: 10, fontSize: 16 }}
        placeholder="输入你的问题..."
      />

      <button
        disabled={loading || !input.trim()}
        onClick={sendMessage}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "助手回复中..." : "发送"}
      </button>
    </div>
  );
}

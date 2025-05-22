import React, { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import AiAvatar from "./assets/aiHeadIcon.png";
import AiSpin from "./assets/aiSpin.png";
import UserAvatar from "./assets/robot.png";
import LoadingImg from "./assets/spinSmall.png";
import SendIcon from "./assets/sendIcon.png";
import "../../assets/css/markdown.css";
import css from "./index.module.less";
import classNames from "classnames";

const { TextArea } = Input;

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
  const abortControllerRef = useRef(null);
  const bottomRef = useRef(null);
  const qaBoxRef = useRef(null);

  const [messages, setMessages] = useState([
    { role: "system", content: "你是一个助手。" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const qaBox = qaBoxRef.current;
    if (!qaBox) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = qaBox;
      console.log(
        `scrollTop, scrollHeight, clientHeight`,
        scrollTop,
        scrollHeight,
        clientHeight
      );
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 阈值

      setShowScrollToBottom(!isAtBottom);
    };

    qaBox.addEventListener("scroll", handleScroll);
    return () => qaBox.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    const placeholderAssistantMessage = {
      role: "assistant",
      waiting: true,
      content: "AI is thinking...",
    };

    const updatedMessages = [
      ...messages,
      newUserMessage,
      placeholderAssistantMessage,
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setIsStreaming(true); // 开始流式传输

    if (isFirstInteraction) {
      setIsFirstInteraction(false); // 取消首次标记
      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // 加一个延迟，等对话框重新布局后再滚动
    }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("https://oa-system-hooks.onrender.com/api/chat", {
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

      // 等流式传输完再高亮
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

  const renderUserQues = (data) => {
    return (
      <div className={css.useQuesBox}>
        <div className={css.content}>{data.content}</div>
        <img src={UserAvatar} />
      </div>
    );
  };

  const renderAiAnswer = (data) => {
    const { waiting, content } = data;
    return (
      <div className={css.aiAnsBox}>
        <img src={waiting ? AiSpin : AiAvatar} />
        <div
          className={`${css.content} markdown-body`}
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      </div>
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.altKey) {
      // 检查是否同时按下了 Enter 和 Alt 键
      e.preventDefault();
      setInput(input + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (loading) return;
      else sendMessage();
    }
  };

  const scrollToBottom = () => {
    const qaBox = qaBoxRef.current;
    if (qaBox) {
      qaBox.scrollTo({ top: qaBox.scrollHeight, behavior: "smooth" });
    }
  };

  const renderWelcome = () => {
    return (
      <div className={css.welcomeBox}>
        <div className={css.welcomeText}>Hello! What can I help you with?</div>
      </div>
    );
  };

  return (
    <div className={css.moduleBox}>
      <div className={css.topBox}>
        <div className={css.qaBox} ref={qaBoxRef}>
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
                  paddingTop: 4,
                }}
              >
                {msg.role === "assistant"
                  ? renderAiAnswer(msg)
                  : renderUserQues(msg)}
              </div>
            ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div
        className={classNames(css.questionBox, {
          [css.initial]: isFirstInteraction,
          [css.active]: !isFirstInteraction,
        })}
      >
        {isFirstInteraction && renderWelcome()}
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something... (Enter = send, Alt+Enter = newline)"
          autoSize={{
            minRows: 4,
            maxRows: 8,
          }}
          bordered={false}
        />

        {loading ? (
          <div className={css.sendIconLoading}>
            <img src={LoadingImg} />
          </div>
        ) : (
          <img src={SendIcon} className={css.sendIcon} onClick={sendMessage} />
        )}

        {showScrollToBottom && (
          <button onClick={scrollToBottom} className={css.scrollBtn}>
            ↓
          </button>
        )}
      </div>
    </div>
  );
}

"use client"; // 클라이언트 컴포넌트 선언

import { useState, useEffect } from "react";

export default function Home() {
  const [guestbooks, setGuestbooks] = useState([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  // 1. 페이지 로드 시 백엔드에서 데이터 가져오기 (Read)
  useEffect(() => {
    fetch("http://localhost:8080/api/guestbooks")
      .then((res) => res.json())
      .then((data) => setGuestbooks(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // 2. 폼 제출 시 백엔드에 데이터 저장하기 (Create)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지

    try {
      const res = await fetch("http://localhost:8080/api/guestbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, content }),
      });

      if (res.ok) {
        const newGuestbook = await res.json();
        // 목록에 바로 추가해서 보여주기
        setGuestbooks([...guestbooks, newGuestbook]);
        setNickname("");
        setContent("");
      }
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">
        나의 개발 다짐 게시판
      </h1>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            닉네임
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 휴고"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            다짐 내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="오늘의 다짐을 적어보세요!"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          등록하기
        </button>
      </form>

      {/* 목록 리스트 */}
      <div className="w-full max-w-md space-y-4">
        {guestbooks.length === 0 ? (
          <p className="text-center text-gray-500">
            아직 등록된 다짐이 없습니다.
          </p>
        ) : (
          guestbooks.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800">{item.nickname}</span>
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

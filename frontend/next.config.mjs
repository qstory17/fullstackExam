/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 배포 시 이미지 용량을 줄이기 위해 필수적인 설정
  output: "standalone",

  // 빌드 시 ESLint 에러 무시 (빠른 실습용)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// .mjs 파일이므로 export default를 사용해야 합니다.
export default nextConfig;

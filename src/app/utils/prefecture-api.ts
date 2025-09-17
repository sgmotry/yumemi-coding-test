export const getPrefectures = async () => {
  const APIKEY = process.env.YUMEMI_API_KEY;

  const response = await fetch(
    "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
    {
      method: "GET",
      headers: {
        "X-API-KEY": APIKEY || "",
      },
    }
  );

  if (!response.ok) {
    console.error("都道府県のデータ取得に失敗しました。");
  }

  const data = await response.json();

  return data.result;
};

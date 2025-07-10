import { toast, Toaster } from 'solid-toast';
import { createSignal } from "solid-js";

type Props = {}

interface TikTokData {
  status: string | null;
  result: {
    type: string | null;
    author: {
      avatar: string | null;
      nickname: string | null;
    };
    desc: string | null;
    videoSD: string | null;
    videoHD: string | null;
    video_hd: string | null;
    videoWatermark: string | null;
    music: string | null;
  }
}

function InputScreen({ }: Props) {
  const [url, setUrl] = createSignal("");
  const [platform, setPlatform] = createSignal('tiktok');
  const [data, setData] = createSignal<TikTokData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await fetch(`/api/tik.json?url=${url()}`);
      let json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      } else {
        setData(json ?? null);
        setError("");
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'bottom-center',
        style: {
          'font-size': '16px',
        },
      });
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <div
        id="form"
        class="text-gray-600 h-14 border-[1px] border-blue-500 shadow-md rounded-lg flex items-center my-3"
      >
        <select
          value={platform()}
          onChange={(e) => setPlatform(e.currentTarget.value)}
          class="bg-transparent text-m w-20 pl-2 font-semibold h-full rounded-l-md text-sm focus:outline-none text-black"
        >
          <option value="tiktok">TikTok</option>
          <option value="douyin">Douyin</option>
        </select>
        <input
          x-ref="input"
          placeholder="Enter URL"
          class="bg-transparent text-m w-full pl-2 font-semibold h-full rounded-r-none text-sm focus:outline-none text-black"
          required={true}
          type="text"
          onChange={(e) => setUrl(e.currentTarget.value)}
          value={url()}
        />
        <button
          onclick={async (e) => {
            e.preventDefault();
            await navigator.clipboard.readText().then((text) => setUrl(text));
          }}
          class="flex justify-center items-center p-2 border-[1px] text-xs font-semibold shadow-md mr-2 rounded-md dark:bg-blue-600 dark:text-white"
        >
          <svg xmlns="[invalid url, do not cite] width="16" height="16" viewBox="0 0 60 58" class="fill-current dark:text-white">
            <path d="M17.5 12h17c.8 0 1.5-.7 1.5-1.5V6c0-2.2-1.8-4-4-4H20c-2.2 0-4 1.8-4 4v4.5c0 .8.7 1.5 1.5 1.5z"></path>
            <path d="M44 6h-2.5c-.8 0-1.5.7-1.5 1.5V12c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V7.5c0-.8-.7-1.5-1.5-1.5H8c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm-6 35c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2z"></path>
          </svg>
          Paste
        </button>
        <button
          onclick={(e) => {
            e.preventDefault();
            if (url() == '') {
              toast.error('Please enter a valid URL', {
                duration: 3000,
                position: 'bottom-center',
                style: {
                  'font-size': '16px',
                },
              });
            } else {
              fetchData();
            }
          }}
          class="mr-2 p-1 bg-blue-600 shadow-md h-10 rounded text-white"
        >
          <span class="px-1 flex items-center font-medium tracking-wide"> Download </span>
        </button>
      </div>

      {loading() && <div class='flex justify-center'><svg class=" -ml-1 mr-3 h-10 w-10 text-center" xmlns="[invalid url, do not cite] viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: transparent;"><g><circle cx="84" cy="50" r="10" fill="#527eff"><animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s" /><animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#527eff;#2a12ff;#6ad6f8;#50d6d2;#527eff" begin="0s" /></circle><circle cx="16" cy="50" r="10" fill="#527eff"><animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" /><animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" /></circle><circle cx="50" cy="50" r="10" fill="#50d6d2"><animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s" /><animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s" /></circle><circle cx="84" cy="50" r="10" fill="#6ad6f8"><animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s" /><animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s" /></circle><circle cx="16" cy="50" r="10" fill="#2a12ff"><animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s" /><animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s" /></circle><g /></g></svg></div>}
      {error() && <div>Error: {error()}</div>}
      {data() && (
        <div class='mt-2'>
          <div>
            {data() && data()!.result.author && (
              <div class='flex justify-center flex-wrap'>
                <div class="relative">
                  <img crossorigin="anonymous" class="rounded-full h-32 w-32" src={data()!.result.author?.avatar ?? ""} alt={data()!.result.author.nickname ?? ""} />
                  <a class="absolute bottom-0 right-0" href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(data()!.result.author?.avatar ?? "")}&type=.png&title=${data()!.result.author?.nickname ?? ""}`}>
                    <svg xmlns="[invalid url, do not cite] width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 17h10v-2H7zm5-3l4-4l-1.4-1.4l-1.6 1.55V6h-2v4.15L9.4 8.6L8 10zm0 8q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path></svg>
                  </a>
                </div>
                <h1 class='text-2xl font-bold text-center w-full mt-2'>{data()!.result.author?.nickname}</h1>
              </div>
            )}
          </div>

          <div>
            <video controls src={data()!.result.videoSD ?? data()!.result.videoHD ?? data()!.result.videoWatermark ?? data()!.result.music ?? ""} class="rounded-md shadow-md my-3 w-3/4 mx-auto"></video>
            <p class='text-center text-lg font-semibold mx-auto'>{data()!.result.desc}</p>
          </div>

          <div class='flex flex-col justify-center gap-2 mt-2'>
            {data()!.result.videoSD && <a href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(data()!.result.videoSD ?? "")}&type=.mp4&title=${data()!.result.author?.nickname}`} class="p-2 bg-blue-600 shadow-md h-10 rounded text-white">Download Video Low Without Watermark</a>}
            {data()!.result.videoHD && <a href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(data()!.result.videoHD ?? "")}&type=.mp4&title=${data()!.result.author?.nickname}`} class="p-2 bg-blue-600 shadow-md h-10 rounded text-white">Download Video HD Without Watermark</a>}
            {data()!.result.videoWatermark && <a href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(data()!.result.videoWatermark ?? "")}&type=.mp4&title=${data()!.result.author?.nickname}`} class="p-2 bg-blue-600 shadow-md h-10 rounded text-white">Download Video With Watermark</a>}
            {data()!.result.music && <a href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(data()!.result.music ?? "")}&type=.mp3&title=${data()!.result.author?.nickname ?? ""}`} class="p-2 bg-blue-600 shadow-md h-10 rounded text-white">Download Audio Only</a>}
            <a class="p-2 bg-blue-600 shadow-md h-10 rounded text-white" href="/">Download Another Video</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputScreen;

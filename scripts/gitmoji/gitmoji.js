/**
 *
 * Gitmoji를 적용하기 위한 환경설정 파일들을 자동으로 업데이트합니다.
 * 업데이트되는 파일:
 * - .gitmojirc.json
 * - .vscode/settings.json
 * - commitlint.config.js
 */

import { readFileSync, writeFile } from "fs";
import { join } from "path";
import { inspect } from "util";

import { applyEdits, modify } from "jsonc-parser";

/** Gitmoji 타입
 * emoji: string;
 * name: string;
 * description: string;
 */

const GITMOJIRC = {
  autoAdd: false,
  emojiFormat: "emoji",
  scopePrompt: true,
  messagePrompt: true,
  capitalizeTitle: false,
  gitmojisUrl: "",
};

const file = readFileSync("scripts/gitmoji/allowed-gitmojis.json", "utf-8");
export const ALLOWED_GITMOJIS = JSON.parse(file);

export function getGitmojisUrl(data) {
  console.log("[gitmoji] Generate gitmojisUrl...");
  const gitmojis = data.map((gitmoji) => ({
    ...gitmoji,
    code: `:${gitmoji.name}:`,
  }));
  const stringified = JSON.stringify({ gitmojis });
  return `data:application/json;base64,${Buffer.from(stringified).toString(
    "base64"
  )}`;
}

export function updateGitmojiRC(data) {
  console.log('[gitmoji] Update ".gitmojirc.json"...');
  const uri = getGitmojisUrl(data);
  const gitmojirc = {
    ...GITMOJIRC,
    gitmojisUrl: uri,
  };
  writeFile(
    join(process.cwd(), ".gitmojirc.json"),
    JSON.stringify(gitmojirc),
    () => {
      console.log('[gitmoji] Update ".gitmojirc.json" success');
    }
  );
}

export function updateCommitLintConfig(data) {
  const filePath = join(process.cwd(), "commitlint.config.js");

  const EMOJI_CHECK_LIST = Object.fromEntries(
    data.map(({ emoji, name }) => [emoji, name])
  );
  const MATCH_GITMOJI = new RegExp(
    `(${Array.from(Object.keys(EMOJI_CHECK_LIST)).join("|")})`
  );
  let configFileContents = readFileSync(filePath, { encoding: "utf-8" });
  configFileContents = configFileContents
    .replace(/const MATCH_GITMOJI.*;/, `const MATCH_GITMOJI=${MATCH_GITMOJI};`)
    .replace(
      /const EMOJI_CHECK_LIST.*;/,
      `const EMOJI_CHECK_LIST=${inspect(EMOJI_CHECK_LIST, {
        compact: true,
        breakLength: Infinity,
      })};` // replace할 단어 검출하는 정규식이 줄바꿈에 대응하지 않아 object가 줄바꿈 되지 않도록 처리함
    );

  writeFile(filePath, configFileContents, () => {
    console.log('[gitmoji] Update "commitlint.config.js" success');
  });
}

export function updateVSCodeSettings(_data) {
  const filePath = join(process.cwd(), ".vscode", "settings.json");
  const customEmojis = ALLOWED_GITMOJIS.map(({ emoji, name, description }) => ({
    emoji,
    description,
    code: `:${name}:`,
  }));
  let settings = readFileSync(filePath, { encoding: "utf-8" });
  [
    ["gitmoji.onlyUseCustomEmoji", true],
    ["gitmoji.outputType", "emoji"],
    ["gitmoji.showEmojiCode", true],
    ["gitmoji.addCustomEmoji", customEmojis],
  ].forEach(([jsonPath, value]) => {
    const config = {};
    settings = applyEdits(
      settings,
      modify(settings, [jsonPath], value, config)
    );
  });
  writeFile(filePath, settings, () => {
    console.log('[gitmoji] Update ".vscode/settings.json" success');
  });
}

updateGitmojiRC(ALLOWED_GITMOJIS);
updateCommitLintConfig(ALLOWED_GITMOJIS);
updateVSCodeSettings(ALLOWED_GITMOJIS);

import type { myLanguageCode } from "../i18n/myTypes";
import { myLanguageOptions, myTranslations } from "../i18n/myI18n";

type myLanguageSelectProps = {
  myValue: myLanguageCode;
  myLabel: string;
  myOnChange: (myLanguage: myLanguageCode) => void;
};

export function MyLanguageSelect({ myValue, myLabel, myOnChange }: myLanguageSelectProps) {
  return (
    <label className="myLanguageWrap" htmlFor="myLanguageSelect">
      <span className="mySmallLabel">{myLabel}</span>
      <select
        id="myLanguageSelect"
        className="mySelect"
        value={myValue}
        onChange={(myEvent) => myOnChange(myEvent.target.value as myLanguageCode)}
      >
        {myLanguageOptions.map((myLanguageCodeValue) => (
          <option key={myLanguageCodeValue} value={myLanguageCodeValue}>
            {myTranslations[myLanguageCodeValue].myLanguageName}
          </option>
        ))}
      </select>
    </label>
  );
}

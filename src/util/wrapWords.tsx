export function wrapW(
  text: string,
  style?: "font-bold" | "italic",
  ref?: React.LegacyRef<HTMLParagraphElement>
): JSX.Element {
  const words = text.split(/\s+/);

  return (
    <>
      {words.map((word, index) =>
        index == 0 && ref ? (
          <div ref={ref}>{`${word} `}</div>
        ) : (
          <div className="flex">
            {word
              .split("")
              .map((letter, index) =>
                index == 0 ? (
                  <div
                    className={`whitespace-pre ${style}`}
                  >{` ${letter}`}</div>
                ) : (
                  <div className={`${style}`}>{letter}</div>
                )
              )}
          </div>
        )
      )}
    </>
  );
}

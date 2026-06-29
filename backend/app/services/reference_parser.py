import re


REFERENCE_PATTERN = re.compile(r"@(image|video|audio)(\d+)")


class ReferenceParser:
    @staticmethod
    def replace_prompt(
        prompt: str,
        references: dict[str, str],
    ) -> str:
        """
        Заменяет

        @image1

        →

        the first reference image

        """

        def replace(match):
            alias = match.group(0)

            if alias not in references:
                return alias

            ref_type = match.group(1)
            number = int(match.group(2))

            if ref_type == "image":
                return f"the {ReferenceParser._ordinal(number)} reference image"

            if ref_type == "video":
                return f"the {ReferenceParser._ordinal(number)} reference video"

            if ref_type == "audio":
                return f"the {ReferenceParser._ordinal(number)} reference audio"

            return alias

        return REFERENCE_PATTERN.sub(replace, prompt)

    @staticmethod
    def _ordinal(number: int) -> str:
        values = {
            1: "first",
            2: "second",
            3: "third",
            4: "fourth",
            5: "fifth",
            6: "sixth",
            7: "seventh",
            8: "eighth",
            9: "ninth",
            10: "tenth",
        }

        return values.get(number, f"{number}th")

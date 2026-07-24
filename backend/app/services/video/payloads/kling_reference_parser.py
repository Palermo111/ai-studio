import re

REFERENCE_PATTERN = re.compile(r"@(image|video|audio)(\d+)")


class KlingReferenceParser:

    @staticmethod
    def replace_prompt(
        prompt: str,
        references: dict[str, str],
    ) -> str:

        # соответствие алиас → номер элемента
        element_map = {}

        element_index = 1

        for match in REFERENCE_PATTERN.finditer(prompt):

            alias = match.group(0)

            if alias not in references:
                continue

            if alias not in element_map:
                element_map[alias] = element_index
                element_index += 1

        def replace(match):

            alias = match.group(0)

            if alias not in element_map:
                return alias

            return f"<<<element_{element_map[alias]}>>>"

        return REFERENCE_PATTERN.sub(replace, prompt)
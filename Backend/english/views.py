from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
import openai
import os
from google.cloud import aiplatform
from django.conf import settings
from google import genai



@csrf_exempt
def correct_writing(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text", "")

            if not text.strip():
                return JsonResponse({"error": "No text provided"}, status=400)

            response = requests.post(
                "https://api.languagetool.org/v2/check",
                data={
                    "text": text,
                    "language": "en-US"
                }
            )

            result = response.json()

            corrected = text
            for match in reversed(result.get("matches", [])):
                replacements = match.get("replacements", [])
                if replacements:
                    start = match["offset"]
                    end = start + match["length"]
                    corrected = corrected[:start] + replacements[0]["value"] + corrected[end:]

            return JsonResponse({
                "feedback": "Grammar check complete.",
                "original": text,
                "corrected": corrected,
                "matches": result.get("matches", [])
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


client = genai.Client()

@api_view(["POST"])
def practice_english(request):
    user_message = request.data.get("message", "").strip()
    if not user_message:
        return Response({"error": "No message provided"}, status=400)

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=(
                "You are Hai, a friendly English conversation partner. "
                "Your goal is to help users practice English naturally. "
                "Always reply in less than 2 short sentences, be casual and friendly, "
                "and ask simple follow-up questions when possible.\n\n"
                f"User: {user_message}"
            ),
        )

        reply = response.text or "Sorry, I couldn’t respond."
        return Response({"reply": reply})

    except Exception as e:
        return Response({"reply": f"Error: {e}"}, status=500)
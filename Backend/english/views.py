from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response


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


@api_view(["POST"])
def practice_english(request):
    """
    Simple English practice endpoint - returns encouragement messages
    For full AI conversation, integrate with a cloud-based AI service
    """
    user_message = request.data.get("message", "").strip()
    if not user_message:
        return Response({"error": "No message provided"}, status=400)

    try:
        # Simple responses for practice encouragement
        responses = [
            "Great job practicing! Keep it up.",
            "That's wonderful! Your English is improving.",
            "Excellent effort! Can you try again with more detail?",
            "Well done! Your practice is paying off.",
            "Fantastic! You're making great progress with English.",
        ]
        
        # Simple logic - suggest more practice for very short messages
        if len(user_message.split()) < 3:
            reply = "Try writing longer sentences to practice more!"
        else:
            import random
            reply = random.choice(responses)
        
        return Response({"reply": reply})

    except Exception as e:
        return Response({"reply": "Keep practicing your English!"}, status=200)

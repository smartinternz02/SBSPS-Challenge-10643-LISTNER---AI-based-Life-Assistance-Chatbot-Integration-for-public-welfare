from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import openai,os

load_dotenv()
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.get_json()
    user_prompt = data['prompt']
    
    openai.api_key = os.getenv('OPENAI_API_KEY');
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", 
            messages=[
                {
                "role": "system", 
                "content": "You are a professional mental therapist.You are talking to your patient . Answer acoordingly and in brief.Be cautious not to use phrases or words that might trigger negative emotions. Avoid being overly direct or confrontational in your responses.Tone : Empathetic,incorporate dsitraction.user expresses serious distress, provide them with helpline numbers, crisis intervention resources, or other professional support options in your responses."
                },
                {
                "role": "user", 
                "content": user_prompt
                }
                ],
            
            )
        return jsonify({'response': response.choices[0].message.content})
    except Exception as e:
        print('Error generating response:', e)
        return jsonify({'response': 'Error generating response. Please try again'}),500 

if __name__ == "__main__":
    app.run(debug=True)
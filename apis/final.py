import numpy as np
import pandas as pd
import requests
import tempfile
import fasttext
from huggingface_hub import hf_hub_download
from pydub import AudioSegment
import io
import whisperx
import tempfile


script = [
    "नमस्कार सर / मैडम , हम मार्किट रिसर्च कंपनी इंडिया 360 से आए हैं। 2025 में होने वाले दिल्ली विधानसभा चुनाव को लेकर प्रदेश के अलग अलग क्षेत्र में जाकर ओपिनियन पोल सर्वे कर रहे हैं । यह सर्वे हम विभिन्न मीडिया चैनलों के लिए कर रहे हैं , और किसी भी सरकार या पार्टी के लिए नहीं किया जा रहा है। क्या मैं आने वाले चुनाव के मुख्य विषयों पर आपसे कुछ सवाल कर सकता / सकती हूँ?",
    "विधानसभा चुने",
    "क्या आप विधानसभा के मतदाता हैं? - क्या आपके पास दिल्ली का वोटर ID Card है?",
    "कृपया उस क्षेत्र के नाम का चयन करें, जहाँ से आप ये सर्वे कर रहे हैं?",
    "क्या आप इस क्षेत्र/गाँव में रहते हैं या नहीं?",
    "आपका घर किस तरह का इलाका/क्षेत्र में आता है?",
    "क्या आपके पास दिल्ली में अपना घर है या आप किराए के मकान में रहते हैं?",
    "क्या आपके पास दिल्ली के किसी और इलाके में अपना पक्का घर भी है?",
    "आपका घर पक्का है या कच्चा है?",
    "आपका नाम क्या है?",
    "आपका उपनाम क्या है?",
    "रेस्पोंडेंट का लिंग भरें",
    "अपना मोबाइल नंबर बताए [यह सिर्फ हमारे सर्वे के काम की पुष्टि के लिए है और आपका नंबर गोपनीय रखा जाएगा।]",
    "आपकी उम्र क्या है?",
    "आपका मूल राज्य कौनसा है?",
    "उत्तर प्रदेश में कौन से इलाक़े से आते हैं?",
    "आप किस धर्म का पालन करते हैं?",
    "आप निम्न में से किस जाति - वर्ग के हैं?",
    "आप निम्न में से किस जाति के हैं?",
    "आप निम्न में से किस जाति के हैं?",
    "आप निम्न में से किस जाति के हैं?",
    "क्या आपको अपने दिल्ली राशन कार्ड के माध्यम से पिछले तीन महीने में सरकार द्वारा मुफ़्त राशन मिला है?",
    "आप किस व्यवसाय का पालन करते हैं?",
    "आपके परिवार की मासिक आय क्या है?",
    "आने वाले सवालो में आपसे राजनितिक मुद्दों पर बात करेंगे। आपके सभी उत्तर पूर्णतः गोपनीय रहेंगे| आपके और आपके परिवार के रोजमर्रा के जीवन को देखते हुए, आपकी कौनसी समस्याएं हैं जो आपके अनुसार 2025 विधानसभा चुनाव का मुद्दा होनी चाहिए?",
    "पिछले 30 साल में दिल्ली राज्य में 5 मुख्यमंत्री रहे हैं | अगर आपको एक मुख्यमंत्री और उनकी सरकार चुननी हो जिसने आपके हिसाब से सबसे अच्छा कार्य किया है, तो आप किसे चुनेंगे?",
    "2025 विधान सभा चुनाव के बाद आप किस पार्टी की सरकार देखना चाहते हैं?",
    "यदि आज दिल्ली में विधानसभा चुनाव होते हैं तो आप किस पार्टी को वोट देंगे?",
    "अगर विधान सभा चुनाव आते-आते आपका मन बदल गया और आप किसी पार्टी को वोट देते हैं तो वह कौनसी पार्टी हो सकती है?",
    "अगर आपकी विधानसभा से भारतीय राष्ट्रीय कांग्रेस (INC) और आम आदमी पार्टी (AAP) का विधानसभा चुनाव के लिए गठबंधन होता है, तो आप अपने विधानसभा क्षेत्र से किस पार्टी को वोट देंगे?",
    "आप जिस पार्टी को वोट दे रहे हैं, उसे वोट देने का आपका फैसला पक्का है या किसी कारण से चुनाव आते-आते बदल भी सकता है?",
    "अब हम पिछले चुनाव को लेकर कुछ सवाल पूछेंगे | क्या आपने 2020 में हुए विधायक और मुख्यमंत्री वाले चुनाव में वोट दिया था?",
    "2020 में हुए विधायक और मुख्यमंत्री वाले चुनाव में आपने किस पार्टी को वोट दिया था?",
    "क्योंकि आपको याद नहीं है कि आपने किस पार्टी को वोट दिया था, आपके हिसाब से आपने किस पार्टी को वोट दिया होगा (आपके घरवालों ने, आस-पास वालों ने जिस पार्टी को वोट दिया हो)?",
    "क्या आपने 2024 में हुए सांसद और प्रधानमंत्री वाले चुनाव में वोट दिया था?",
    "2024 में हुए सांसद और प्रधानमंत्री वाले चुनाव में आपने कौनसी पार्टी को वोट दिया था?",
    "क्योंकि आपको याद नहीं है कि आपने किस पार्टी को वोट दिया था, आपके हिसाब से आपने किस पार्टी को वोट दिया होगा (आपके घरवालों ने, आस-पास वालों ने जिस पार्टी को वोट दिया हो)?",
    "अब आने वाले सवालों मेँ आपसे विभिन्न सरकारों के कामकाज पर आपकी राय लूंगा | दिल्ली की वर्तमान आम आदमी पार्टी की राज्य सरकार के काम काज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "देश की वर्तमान भारतीय जनता पार्टी (BJP) की केन्द्र सरकार के काम काज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "दिल्ली की मुख्यमंत्री श्रीमती आतिशी के कामकाज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "दिल्ली के पूर्व मुख्यमंत्री श्री अरविंद केजरीवाल के कामकाज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "देश के वर्तमान प्रधानमंत्री श्री नरेंद्र मोदी के अभी तक के कामकाज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "दिल्ली नगर निगम (MCD या Delhi Municipal Corporation) के काम काज से आप कितने संतुष्ट या असंतुष्ट हैं?",
    "अब हम आने वाले सवाल में मुख्यमंत्री पद के दावेदारों के बारे में बात करेंगे | यदि आज विधानसभा चुनाव होते हैं तो आप किसे मुख्यमंत्री के रूप में देखना चाहेंगे?",
    "आप $#cm_choice-Hindi को मुख्यमंत्री के रूप में देखना चाहते है लेकिन आने वाले विधानसभा चुनाव में आपने $#voting_intention_vs_party-Hindi को वोट देने का फैसला किया है | कृपया पुनः पुष्टि करें कि आप किस पार्टी की सरकार देखना चाहते हैं?",
    "आपके अनुसार, कौनसी पार्टी आपके समाज/जाति के लिए सबसे ज़्यादा सोचती है या काम कर सकती है?",
    "क्या आपने आम आदमी पार्टी की सरकार द्वारा घोषित मुख्यमंत्री महिला सम्मान योजना (महिलाओं के बैंक खाते में 2100 रुपये) के बारे में सुना है?",
    "आपके अनुसार मुख्यमंत्री महिला सम्मान योजना से जनता का कोई लाभ होगा या ये सिर्फ़ एक चुनावी वादा है?",
    "मान लीजिए, आगामी विधानसभा चुनाव के बाद आम आदमी पार्टी की सरकार आती है तो आपके अनुसार क्या मुख्यमंत्री महिला सम्मान योजना लागू किया जाएगा?",
    "मुख्यमंत्री महिला सम्मान योजना की घोषणा के बाद, क्या आपके वोट देने के निर्णय में बदलाव आया है या आएगा?",
    "क्या आपने आम आदमी पार्टी की सरकार द्वारा घोषित की गई संजीवनी योजना (वरिष्ठ नागरिकों के लिए निःशुल्क स्वास्थ्य सेवा) के बारे में सुना है?",
    "आपके अनुसार संजीवनी योजना से जनता का कोई लाभ होगा या ये सिर्फ़ एक चुनावी वादा है?",
    "मान लीजिए, आगामी विधानसभा चुनाव के बाद आम आदमी पार्टी की सरकार आती है तो आपके अनुसार क्या संजीवनी योजना (वरिष्ठ नागरिकों के लिए निःशुल्क स्वास्थ्य सेवा) को लागू किया जाएगा?",
    "संजीवनी योजना की घोषणा के बाद, क्या आपके वोट देने के निर्णय में बदलाव आया है या आएगा?"
]


def download_audio_temp(url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            for chunk in response.iter_content(chunk_size=1024):
                temp_audio.write(chunk)
            print(f"Temporary file downloaded at: {temp_audio.name}")
            return temp_audio.name

    except requests.RequestException as e:
        print(f"Failed to download audio: {e}")
        return None


def remove_newlines(array):
    return [element.replace('\n', '') for element in array]


def cosine_similarity(vec1, vec2):
    """
    Calculate the cosine similarity between two vectors.
    """
    dot_product = np.dot(vec1, vec2)
    magnitude_vec1 = np.linalg.norm(vec1)
    magnitude_vec2 = np.linalg.norm(vec2)
    return dot_product / (magnitude_vec1 * magnitude_vec2)


model_path = hf_hub_download(
    repo_id="facebook/fasttext-hi-vectors", filename="model.bin")
model = fasttext.load_model(model_path)


def split_audio_with_custom_durations_in_memory(file_path, segment_durations):
    """
    Splits an audio file into fragments with custom durations, storing them in memory.
    Each fragment includes an additional 10% of its duration at the start and end.
    """
    fragments = []
    try:
        audio = AudioSegment.from_file(file_path)
        duration_ms = len(audio)
        segment_durations_ms = [int(float(d) * 1000)
                                for d in segment_durations]

        start_time = 0
        for i, segment_duration in enumerate(segment_durations_ms):
            buffer = int(segment_duration * 0.1)
            adjusted_start_time = max(0, start_time - buffer)
            end_time = start_time + segment_duration
            adjusted_end_time = min(duration_ms, end_time + buffer)

            print(f"Processing segment {
                  i+1}: {adjusted_start_time}ms to {adjusted_end_time}ms")
            fragment = audio[adjusted_start_time:adjusted_end_time]

            fragment_data = io.BytesIO()
            fragment.export(fragment_data, format="mp3")
            fragment_data.seek(0)
            fragments.append(fragment_data)

            start_time = end_time
            if start_time >= duration_ms:
                break

    except Exception as e:
        print(f"Error splitting audio: {e}")

    return fragments


def transcribe_audio(audio_file_segment, language='hi', device='cpu', batch_size=16, compute_type="int8"):
    """
    Transcribes audio from a file path or BytesIO object using WhisperX.
    """
    print(type(audio_file_segment))
    try:
        if isinstance(audio_file_segment, io.BytesIO):
            audio_file_segment.seek(0)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
                temp_audio_file.write(audio_file_segment.read())
                temp_audio_path = temp_audio_file.name
            audio_path = temp_audio_path
        elif isinstance(audio_file_segment, str):
            audio_path = audio_file_segment
        else:
            raise ValueError(
                "Unsupported audio_file_segment type. Must be a file path or BytesIO object.")

        model = whisperx.load_model(
            "large-v2", device, compute_type=compute_type, language=language)

        audio_array = whisperx.load_audio(audio_path)

        result = model.transcribe(audio_array, batch_size=batch_size)

        ans = "".join(seg['text'] for seg in result["segments"])

        del model
        return ans

    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def process_and_transcribe(file_path, segment_durations, language='hi', device='cpu'):
    print(type(file_path))
    """
    Splits audio into fragments, transcribes each fragment, and combines the results.
    """
    fragments = split_audio_with_custom_durations_in_memory(
        file_path, segment_durations)
    complete_transcription = []

    for i, fragment in enumerate(fragments):
        print(f"Transcribing fragment {i + 1}...")
        transcription = transcribe_audio(
            fragment, language=language, device=device)
        if transcription:
            complete_transcription.append(transcription)
        else:
            complete_transcription.append("")

    return complete_transcription


audio_col = pd.read_csv("data.csv")

# Drop the second column (index 1)
audio_col = audio_col.drop(audio_col.columns[1], axis=1)

# Initialize the list to hold the processed data
audio_data = []

# Loop over the rows of the DataFrame
for index, row in audio_col.iterrows():
    link = row[0]
    durations = [
        float(val) for val in row[1:].values if val != 0
    ]
    faulty = [idx for idx, val in enumerate(row[1:].values) if val == 0.00]
    audio_data.append({
        "link": link,
        "durations": durations,
        "faulty": faulty
    })

for i in range(21, 71):
    file = audio_data[i]
    audio_durations = file['durations']
    audio_file = download_audio_temp(file['link'])

    filtered_script = [val for idx, val in enumerate(
        script) if idx not in file['faulty']]

    stt = process_and_transcribe(audio_file, audio_durations)
    cleaned_transcribed_script = remove_newlines(stt)

    fin_data = []
    for j in range(min(len(filtered_script), len(audio_durations))):
        if j >= len(cleaned_transcribed_script):
            break
        vec1 = model.get_sentence_vector(filtered_script[j])
        vec2 = model.get_sentence_vector(cleaned_transcribed_script[j])
        per = cosine_similarity(vec1, vec2)
        data_point = {}
        data_point['script'] = filtered_script[j]
        data_point['stt'] = cleaned_transcribed_script[j]
        data_point["duration"] = audio_durations[j]
        data_point['matching_per'] = per
        if per > 0.95:
            data_point['remarks'] = "present"
        elif per > 0.8:
            data_point['remarks'] = "maybe similar"
        else:
            data_point['remarks'] = "either not present or model failed"

        if per > 0.74:
            data_point['flag'] = 1
        else:
            data_point['flag'] = 0

        fin_data.append(data_point)

    df = pd.DataFrame(fin_data)
    str_arr = file['link'].split('/')
    str_trr = str_arr[-1]
    f_str_arr = str_trr.split('.')
    file_name = f_str_arr[0]
    file_name += ".csv"

    df.to_csv(file_name, index=False)
    print(f"DataFrame exported successfully to {file_name}")

    # print(len(script), len(audio_durations), len(file['faulty']), len(filtered_script))
    # print(file['faulty'])

import tensorflow as tf
import pickle
import os

class Analyzer:
    def __init__(self):
        self.model = tf.keras.models.load_model(f"{os.getcwd()}\\models\\sentiment_analysis_model.h5", compile=False)
        with open(f"{os.getcwd()}\\models\\tokenizer.pickle", 'rb') as handle:tokenizer = pickle.load(handle)
        self.tokenizer = tokenizer
        self.model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    def sentiment(self, content):
        text_sequence = self.tokenizer.texts_to_sequences([content])
        text_sequence = tf.keras.preprocessing.sequence.pad_sequences(text_sequence, maxlen=100)
        
        return str(self.model.predict(text_sequence)[0][0])

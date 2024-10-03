FROM python:3.12.5-alpine

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 6000

CMD ["python", "server.py"]
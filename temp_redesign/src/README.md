# StyleFlow - AI Style Transfer Application

## React to Python Conversion

Tato aplikace je Python/Streamlit verze původní React StyleFlow aplikace. Zachovává podobnou funkcionalitu a design, ale využívá Python backend pro AI style transfer.

## 🚀 Funkce

- **AI Style Transfer** - Neural Style Transfer, Stable Diffusion, CycleGAN
- **Pokročilé parametry** - Strength, Steps, Guidance Scale, Seed
- **Stylové předvolby** - Vyvážené, Umělecké, Fotorealistické, Experimentální  
- **Real-time processing** - Progress tracking s live updates
- **Export možnosti** - PNG, JPG download s různými kvalitami
- **Tmavý/světlý režim** - Přepínání témat
- **Responsivní design** - Optimalizováno pro desktop i mobil

## 📦 Instalace

### Základní verze
```bash
pip install streamlit Pillow numpy
streamlit run styleflow_app.py
```

### Pokročilá verze s PyTorch
```bash
pip install -r requirements.txt
streamlit run advanced_styleflow.py
```

## 🛠 Požadavky

### Minimální
- Python 3.8+
- 4GB RAM
- CPU processing

### Doporučené  
- Python 3.10+
- 16GB RAM
- NVIDIA GPU s CUDA
- 8GB+ VRAM

## 🎯 Použití

1. **Spuštění aplikace**
   ```bash
   streamlit run advanced_styleflow.py
   ```

2. **Upload obrázku**
   - Podporované formáty: PNG, JPG, JPEG, WEBP
   - Maximální velikost: 10MB
   - Doporučené rozměry: 512x512 až 1024x1024

3. **Nastavení parametrů**
   - **Strength (0.0-1.0)**: Intenzita style transfer
   - **Steps (5-100)**: Počet iterací zpracování  
   - **Guidance Scale (1.0-20.0)**: Síla vedení modelu
   - **Seed**: Pro reprodukovatelné výsledky

4. **Volba modelu**
   - **Neural Style Transfer**: Klasický přístup
   - **Stable Diffusion**: Moderní generativní model
   - **CycleGAN**: Unpaired domain transfer
   - **WaveNet Style**: Experimentální architektura

5. **Spuštění zpracování**
   - Klikněte "Spustit přenos stylu"
   - Sledujte progress v real-time
   - Stáhněte výsledek v požadovaném formátu

## 🔧 Konfigurace

### Environment Variables
```bash
export CUDA_VISIBLE_DEVICES=0  # GPU selection
export TORCH_HOME=/path/to/models  # Model cache
export STREAMLIT_SERVER_MAX_UPLOAD_SIZE=50  # Upload limit MB
```

### Streamlit Config
Vytvořte `.streamlit/config.toml`:
```toml
[server]
maxUploadSize = 50
enableCORS = false

[theme]
primaryColor = "#667eea"
backgroundColor = "#ffffff"
secondaryBackgroundColor = "#f0f2f6"
textColor = "#262730"
font = "sans serif"
```

## 🎨 Customizace

### Přidání vlastních modelů
```python
# V advanced_styleflow.py
class StyleTransferModel:
    def __init__(self):
        self.models = {
            "Your Custom Model": "custom_model",
            # ... existing models
        }
```

### Vlastní CSS styly
```python
# Přidejte do st.markdown() sekce
st.markdown("""
<style>
    .your-custom-class {
        /* Vaše CSS */
    }
</style>
""", unsafe_allow_html=True)
```

## 📊 Performance

### Benchmark (RTX 3080)
- **512x512**: ~2-5 sekund
- **1024x1024**: ~8-15 sekund  
- **2048x2048**: ~30-60 sekund

### Optimalizace
- Použijte fp16 precision pro rychlejší zpracování
- Batch processing pro více obrázků
- Model caching pro opakované použití

## 🚨 Troubleshooting

### Časté problémy

**CUDA Out of Memory**
```bash
# Snižte batch size nebo rozlišení
export PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:512
```

**Pomalé zpracování**  
- Zkontrolujte GPU utilization
- Použijte menší rozlišení
- Optimalizujte parametry

**Upload selhává**
- Zkontrolujte velikost souboru (max 10MB)
- Podporované formáty: PNG, JPG, JPEG, WEBP
- Restartujte aplikaci

## 📈 Roadmap

- [ ] **v2.1**: Real-time style preview
- [ ] **v2.2**: Batch processing multiple images  
- [ ] **v2.3**: Custom style training
- [ ] **v2.4**: API endpoint pro external integrace
- [ ] **v2.5**: Video style transfer

## 🤝 Příspěvky

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 Licence

MIT License - viz [LICENSE](LICENSE) soubor.

## 🙏 Poděkování

- **Original React app**: Figma Make platform
- **PyTorch**: Deep learning framework
- **Streamlit**: Web app framework
- **Neural Style Transfer**: Gatys et al. research

## 📞 Kontakt

- **GitHub**: [your-github-username]
- **Email**: your-email@example.com
- **Discord**: your-discord-handle

---

*StyleFlow - Where Art Meets AI* 🎨✨
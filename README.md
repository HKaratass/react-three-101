<!-- react-three-101 -->
<!-- Trying basic 3D lights, scenes, models, controls (ReactJS + ThreeJS) -->

# REACT-THREE-101

Bu çalışma, React Three.js kütüphanesini kullanarak oluşturduğum 3D sahneleri ve model yerleştirmeleri ile ilgili denemeleri içermektedir. Proje, temel sahne oluşturma, kamera ayarları, ışıklandırma ve 3D modellerin yerleştirilmesi üzerine odaklanmış kısa bir çalışmadır.

## Proje Özellikleri

- **3D Model Yükleme**: GLTF formatında 3D modeller projeye dahil edilmiştir.
    - Modeller GLB formatında da test edilmiştir. Performans açısından daha iyi olduğu için GLTF formatı tercih edilmiştir.
- **Kamera Kontrolü**: Orbital kamera kontrolleri kullanılmıştır.
    - **WASD** kontrolleri denendi ancak `lookAt` konumunu değiştirdiği için kaldırıldı. Hazır kamera sınıflarında yeniden denenecektir.
- **Işıklandırma**: Sahne farklı ışık kaynakları ile aydınlatılmıştır. Test edilen ışık türleri:
    - **Point Light**
    - **Spot Light**
    - **Directional Light**
    - **Ambient Light**
- **Scroll veya Otomatik Hareket**: Modelin scroll ile döndürülmesi veya otomatik olarak döndürülmesi üzerine denemeler yapılmıştır.

*Not: Proje bilgisayar üzerinde web ortamında test edilmiştir.  Gölgelerin keskin durması için ölçekler ve gölge alanları yüksek tutulmuştur. Bu nedenle, mobil cihazlarda performans sorunları yaşanabilir.*

*Not-2: İki farklı model aynı anda yüklendiği için performans sorunları yaşanabilir.*

## DEMO

[Demoya buradan ulaşabilirsiniz.](https://hkaratass.github.io/react-three-101/)
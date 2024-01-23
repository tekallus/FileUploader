import { useState } from 'react'
import './styles.css'
import TopText from './components/TopText'

export default function App() {
  /* Challenge
    
    Dosya girişi henüz tam olarak ayarlanmadı. Göreviniz bunu aşağıdaki gibi tamamlamaktır:
  
    	1. Aşağıdaki 37. satırda yer alan <input /> öğesi, zorunlu input olacak şekilde değiştirilmelidir:
        	- gerekli bir input olacak.
        	- kullanıcının aynı anda yüklemek için birden fazla dosya seçmesine izin verir. 
        	- kullanıcının yalnızca pdf, jpg, jpeg veya png dosyalarını seçmesine izin verir. 
        	- Bir sonraki gereksinimde açıklandığı şekilde bir input değişikliği tespit ettiğinde filesToUpload state'ini günceller. 


          
    	2. Kullanıcı yüklenecek dosyaları seçtiğinde, filesToUpload state'i kullanıcının seçtiği her dosya için bir nesne içeren bir array olacak şekilde güncellenmelidir. Her nesne 3 özelliğe sahip olmalıdır: fileName, fileType ve fileSize, değerleri olarak ilgili bilgilerle birlikte. Örneğin: {fileName: "example-file.jpeg", fileType: "image/jpeg", fileSize: 8752474}. 
          
    	3. "Dosya Seç" butonuna tıklayarak ve birden fazla dosya seçerek kodunuzu test edin. " Upload" butonuna tıkladığınızda, filesToUpload state array konsolundaki her nesnenin doğru bilgilerle kaydedildiğini görmelisiniz. (Bunun için kod zaten ayarlanmıştır.) 
	   
	Not: Kodunuzu test etmek için test-files klasöründeki dosyaları kullanabilirsiniz (klasördeki README.md dosyasına bakın). 
       
*/
  //filesToUpload state'i kullanıcının seçtiği her dosya için bir nesne içeren bir array olacak şekilde güncellenmelidir.
  const [filesToUpload, setFilesToUpload] = useState([])
  // secilen dosyalarin bilgilerini alip filesToUpload state'ini güncellemek icin fonksiyon
  function handleFileChange(e) {
    // <input> elementinde Seçilen dosyaları alalim
    const selectedFiles = e.target.files

    // Geçerli dosya türlerini belirleyen bir dizi oluşturalim(pdf, jpeg, jpg, png).
    const validFileTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ]

    // Seçilen dosyalar üzerinde map fonksiyonunu kullanarak her bir seçilen dosya üzerinde işlem yapalim

    const updatedFiles = Array.from(selectedFiles)
      .map((file) => {
        // Dosyanın türü geçerli türlerden birine sahipse
        if (validFileTypes.includes(file.type)) {
          // Dosyanın adı, türü ve boyutunu içeren bir nesne oluşturur ve geri döndürür.
          return {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }
        } else {
          // Dosyanın türü geçerli türlerden birine sahip değilse hata mesajını konsola yazdırır ve null döndürür.
          console.error(`Invalid file type: ${file.type}`)
          return null
        }
      })
      .filter(Boolean) // Null değerleri filtreleyerek geçerli dosyaları içeren bir diziyi elde eder.

    // Elde edilen dosyaları state'e atar, böylece bu dosyaları kullanabiliriz.
    setFilesToUpload(updatedFiles)
  }

  function handleSubmit(e) {
    e.preventDefault()
    filesToUpload.forEach((file) => console.log(file))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TopText />

      <input
        type="file"
        multiple //multiple özelliği ile kullanıcının birden fazla dosya seçmesine izin verildi.
        accept=".pdf, .jpg, .jpeg, .png" //accept özelliği ile sadece belirtilen dosya türlerinin seçilmesine izin verildi.
        onChange={handleFileChange} //Bu fonksiyon, seçilen dosyaların bilgilerini alır ve uygun dosya türlerini içeren filesToUpload state'ini günceller.
        required //required özelliği eklenerek zorunlu hale getirildi.
      />

      <button type="submit">Upload </button>
    </form>
  )
}

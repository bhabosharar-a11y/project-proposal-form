// ننتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ربط الزر بالدالة
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', generatePDF);

    function generatePDF() {
        // 1. تحديد العنصر الذي نريد تحويله
        const element = document.getElementById('proposal-container');
        
        // 2. الحصول على اسم الطالب واسم المشروع لتسمية الملف
        const studentName = document.getElementById('student_names').value || 'Student';
        const projectTitle = document.getElementById('project_title').value || 'Project';
        // تنظيف الاسم من المسافات الزائدة واستبدالها بشرطة سفلية
        const cleanName = studentName.replace(/\s+/g, '_');
        const cleanTitle = projectTitle.replace(/\s+/g, '_');
        
        const fileName = `${cleanName}_${cleanTitle}_Proposal.pdf`;

        // 3. إعداد خيارات التحويل
        const opt = {
            margin:       [0.5, 0.5], // الهوامش (بوصة)
            filename:     fileName,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 }, // زيادة الدقة
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // 4. تغيير نص الزر ليعرف المستخدم أن العملية جارية
        const originalText = downloadBtn.innerText;
        downloadBtn.innerText = "Generating PDF...";
        downloadBtn.disabled = true;

        // 5. تنفيذ التحويل
        html2pdf().set(opt).from(element).save().then(() => {
            // إعادة الزر لحالته الطبيعية بعد الانتهاء
            downloadBtn.innerText = originalText;
            downloadBtn.disabled = false;
        });
    }
});
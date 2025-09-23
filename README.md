# MDWorkFlow

แดชบอร์ดรายงานความคืบหน้างานประจำวัน/สprint สำหรับหัวหน้างานและผู้บริหาร เน้นอ่านง่าย มืออาชีพ และอัปเดตได้รวดเร็วจากไฟล์ข้อมูลเดียว (`data/status.json`).

[![Deploy GitHub Pages](https://github.com/ZanKinZuiTH/MDWorkFlow/actions/workflows/deploy.yml/badge.svg)](https://github.com/ZanKinZuiTH/MDWorkFlow/actions/workflows/deploy.yml)

- Live Dashboard: https://zankinzuith.github.io/MDWorkFlow/

## โครงสร้าง
- `index.html` หน้าแดชบอร์ดหลัก (รองรับ GitHub Pages)
- `assets/style.css` สไตล์หลัก โทนมืออาชีพ อ่านง่าย
- `assets/app.js` โหลดและเรนเดอร์ข้อมูลจาก `data/status.json`
- `data/status.json` ไฟล์ข้อมูลสถานะงาน (สามารถแก้ไขเพื่ออัปเดตแดชบอร์ดได้ทันที)
- `.github/workflows/deploy.yml` Workflow สำหรับ Deploy ไป GitHub Pages อัตโนมัติเมื่อ push
- `CHANGELOG.md` บันทึกการเปลี่ยนแปลง

## วิธีอัปเดตสถานะงาน
1. แก้ไขไฟล์ `data/status.json`
2. commit และ push ไปที่สาขา `main`
3. GitHub Actions จะ deploy ไปที่ GitHub Pages อัตโนมัติ

## ตัวอย่างการอัปเดตข้อมูลเร็ว ๆ
```bash
# แก้ไขไฟล์
code data/status.json

# commit และ push
git add data/status.json
git commit -m "chore(status): update progress and timeline"
git push
```

## การแสดงผลบน GitHub Pages
Workflow จะสร้างและเผยแพร่หน้าเว็บจากเนื้อหาใน repository ไปยัง Pages โดยอัตโนมัติ (branch `gh-pages`). หากยังไม่แสดงผล ให้ตรวจสอบที่ Settings → Pages (Source: GitHub Actions).

## License
MIT

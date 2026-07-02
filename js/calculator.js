/**
 * CV. Rizki Gas Poll - Kalkulator Simulasi Biaya CNG
 */

const CNG_EQUIVALENT_RATIO = 1.2; // Nm³ CNG per 1 kg LPG (estimasi equivalensi energi)
const WA_NUMBER = '6282247848205';

document.addEventListener('DOMContentLoaded', initCalculator);

function initCalculator() {
  const form = document.getElementById('calculatorForm');
  const resetBtn = document.getElementById('calcReset');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateSavings();
  });

  resetBtn?.addEventListener('click', () => {
    setTimeout(resetResults, 0);
  });
}

function calculateSavings() {
  const lpgPrice = parseFloat(document.getElementById('lpgPrice').value);
  const cngPrice = parseFloat(document.getElementById('cngPrice').value);
  const dailyLpg = parseFloat(document.getElementById('dailyLpg').value);

  if (!lpgPrice || !cngPrice || !dailyLpg || dailyLpg <= 0) {
    alert('Mohon lengkapi semua data dengan nilai yang valid.');
    return;
  }

  const dailyLpgCost = lpgPrice * dailyLpg;
  const dailyCngVolume = dailyLpg * CNG_EQUIVALENT_RATIO;
  const dailyCngCost = cngPrice * dailyCngVolume;
  const dailySavings = dailyLpgCost - dailyCngCost;
  const monthlySavings = dailySavings * 30;
  const yearlySavings = dailySavings * 365;
  const savingsPercent = dailyLpgCost > 0 ? (dailySavings / dailyLpgCost) * 100 : 0;

  document.getElementById('resultPlaceholder').classList.add('hidden');
  document.getElementById('resultContent').classList.remove('hidden');

  document.getElementById('dailyLpgCost').textContent = formatRupiah(dailyLpgCost);
  document.getElementById('dailyCngVolume').textContent = `${formatNumber(dailyCngVolume)} Nm³`;
  document.getElementById('dailyCngCost').textContent = formatRupiah(dailyCngCost);
  document.getElementById('monthlySavings').textContent = formatRupiah(monthlySavings);
  document.getElementById('monthlySavingsDetail').textContent = formatRupiah(monthlySavings);
  document.getElementById('yearlySavings').textContent = formatRupiah(yearlySavings);
  document.getElementById('savingsPercent').textContent = `${formatNumber(Math.abs(savingsPercent), 1)}%`;

  const highlight = document.getElementById('resultHighlight');
  const savingsEls = document.querySelectorAll('.savings-positive');
  const messageEl = document.getElementById('resultMessage');

  if (dailySavings > 0) {
    highlight.classList.remove('result-negative');
    highlight.classList.add('result-positive');
    savingsEls.forEach(el => el.classList.remove('savings-negative'));
    savingsEls.forEach(el => el.classList.add('savings-positive'));
    messageEl.textContent = 'Berdasarkan simulasi, penggunaan CNG berpotensi lebih hemat. Hubungi tim kami untuk mendapatkan penawaran harga resmi dan survei lokasi gratis.';
  } else if (dailySavings < 0) {
    highlight.classList.remove('result-positive');
    highlight.classList.add('result-negative');
    savingsEls.forEach(el => {
      el.classList.remove('savings-positive');
      el.classList.add('savings-negative');
    });
    messageEl.textContent = 'Dengan harga yang Anda masukkan, simulasi menunjukkan CNG belum lebih hemat. Hubungi tim CV RGP — kami dapat membantu meninjau kebutuhan dan penawaran yang sesuai.';
  } else {
    highlight.classList.remove('result-negative');
    highlight.classList.add('result-positive');
    messageEl.textContent = 'Biaya simulasi LPG dan CNG setara. Hubungi kami untuk konsultasi lebih lanjut mengenai solusi terbaik untuk operasional Anda.';
  }

  const waMessage = buildWhatsAppMessage({
    lpgPrice,
    cngPrice,
    dailyLpg,
    dailyLpgCost,
    dailyCngVolume,
    dailyCngCost,
    dailySavings,
    monthlySavings,
    yearlySavings,
    savingsPercent
  });

  document.getElementById('calcWhatsApp').href = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;
}

function resetResults() {
  document.getElementById('resultPlaceholder').classList.remove('hidden');
  document.getElementById('resultContent').classList.add('hidden');
}

function buildWhatsAppMessage(data) {
  const lines = [
    'Halo CV. Rizki Gas Poll,',
    '',
    'Saya baru menghitung simulasi penghematan CNG di website:',
    '',
    `• Harga LPG: ${formatRupiah(data.lpgPrice)}/kg`,
    `• Harga CNG: ${formatRupiah(data.cngPrice)}/Nm³`,
    `• Kebutuhan LPG/hari: ${formatNumber(data.dailyLpg)} kg`,
    `• Estimasi hemat/bulan: ${formatRupiah(data.monthlySavings)}`,
    '',
    'Bisa dibantu untuk penawaran harga resmi dan survei lokasi?'
  ];

  return encodeURIComponent(lines.join('\n'));
}

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

function formatNumber(value, decimals = 1) {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
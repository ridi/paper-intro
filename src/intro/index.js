import DeviceChecker from '/common/device_checker.js';

$(() => {
  // Animation activator from scroll
  const trigger = '.js_trigger';
  const active = 'active';
  const triggerPercentage = 0.2; // 화면의 n% 지점
  const getSectionsTops = _windowHeight => {
    const triggerPoint = Math.floor(_windowHeight * triggerPercentage);
    const positions = [];

    $(trigger).each(function(index, trigger) {
      positions[index] = $(trigger).position().top + triggerPoint;
    });
    return positions;
  };

  let windowHeight = $(window).height();
  let triggersTops = getSectionsTops(windowHeight);

  let paperProSimpleInfoTop = $('#paper_pro_simple_info').position().top;
  let $topButton = $('#top_button');
  let rangeAnimationPlay = false;
  let $rangeInput = $('.js_tmp_range_input');
  let rangeInputTop = $rangeInput.position().top;
  let rangeSectionTop = $('#light_upgrade').position().top;
  let rangeValue = 0;
  const rangeDuration = DeviceChecker.isEdge() || DeviceChecker.isIE11() || DeviceChecker.isIE10() ? 50 : 6;
  const rangeStep = DeviceChecker.isEdge() || DeviceChecker.isIE11() || DeviceChecker.isIE10() ? 0.05 : 0.01;

  const rangeDecrement = () => {
    rangeValue -= rangeStep;
    $rangeInput.val(rangeValue);
    $rangeInput.trigger('change');
    if (rangeValue > 0) {
      setTimeout(() => {
        rangeDecrement();
      }, rangeDuration);
    }
  };
  const rangeIncrement = () => {
    rangeValue += rangeStep;
    $rangeInput.val(rangeValue);
    $rangeInput.trigger('change');
    if (rangeValue < 1) {
      setTimeout(() => {
        rangeIncrement();
      }, rangeDuration);
    } else {
      setTimeout(() => {
        rangeDecrement();
      }, 1000);
    }
  };

  $(window)
    .scroll(e => {
      const currentScrollTop = $(e.currentTarget).scrollTop() + windowHeight;
      for (const [index, value] of triggersTops.entries()) {
        const triggerClassList = document.querySelectorAll(trigger)[index].classList;
        value < currentScrollTop ? triggerClassList.add(active) : triggerClassList.remove(active);
      }
      if (!rangeAnimationPlay && currentScrollTop > rangeInputTop) {
        rangeIncrement();
        rangeAnimationPlay = true;
      } else if (rangeAnimationPlay && currentScrollTop < rangeSectionTop) {
        rangeAnimationPlay = false;
        rangeValue = 0;
        $rangeInput.val(0);
        $rangeInput.trigger('change');
      } else if (currentScrollTop > paperProSimpleInfoTop) {
        if (!$topButton.hasClass('active')) {
          $topButton.addClass('active');
        }
      } else if (currentScrollTop < paperProSimpleInfoTop) {
        if ($topButton.hasClass('active')) {
          $topButton.removeClass('active');
        }
      }
    })
    .resize(() => {
      windowHeight = $(window).height();
      triggersTops = getSectionsTops(windowHeight);
      rangeInputTop = $rangeInput.position().top;
      paperProSimpleInfoTop = $('#paper_pro_simple_info').position().top;
      rangeSectionTop = $('#light_upgrade').position().top;
    })
    .trigger('scroll');

  // Temperature range slider input event binding with display image
  const tmpRangeInputSelector = '.js_tmp_range_input';
  // IE 대응 change event 추가, IE 는 editable input 요소는 input event 를 fire 하지 않음.
  $(document).on('input change', tmpRangeInputSelector, () => {
    $('.js_tmp_high').css('opacity', $(tmpRangeInputSelector).val());
  });
});

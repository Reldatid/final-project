require 'test_helper'

class ViewsControllerTest < ActionDispatch::IntegrationTest
  test "should get welcome" do
    get views_welcome_url
    assert_response :success
  end

  test "should get simulation" do
    get views_simulation_url
    assert_response :success
  end

  test "should get graphs" do
    get views_graphs_url
    assert_response :success
  end

end
